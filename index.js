/* eslint-disable no-console */
"use strict";

const _ 				= require("lodash");
const args 				= require("args");
const chalk 			= require("chalk");
const handlebars 		= require("handlebars");
const Promise 			= require("bluebird");
const fs 				= Promise.promisifyAll(require("fs"));

args.option(["t", "template"], "'The template README file path", "./templates/README.test.md");
args.option(["s", "service"], "'Source file of the service", "./services/test.service.js");
args.option(["d", "destination"], "'Destination of the generated file", "./out/README.test.md");
const flags = args.parse(process.argv);

if (!flags.service) {
	console.error(chalk.red.bold("Please set a service filename!"));
	process.exit(1);
}

if (!flags.template) {
	console.error(chalk.red.bold("Please provide template name!"));
	process.exit(1);
}

if (!flags.destination) {
	console.error(chalk.red.bold("Please provide destination name!"));
	process.exit(1);
}

const file = flags.service;

function parseWithJsDoc(file) {
	const jsdoc = require("jsdoc-api");

	console.log(chalk.yellow.bold("Parse service file..."));
	console.log("  File: " + chalk.white.bold(file) + "\n");

	let doc = jsdoc.explainSync({ files: [file] });
	return doc;
}
/*
function parseWithDox(content) {
	const dox = require('dox')

	let doc = dox.parseComments(fs.readFileSync(file, "utf8"));
	//fs.writeFileSync("./dox.txt", JSON.stringify(doc, null, 4));
	return doc;
}*/

function readTemplate(doc) {
	return fs.readFileAsync(flags.template, "utf8").then(template => ({
		doc,
		template
	}));
}

function hasTag(item, tagName) {
	if (item.tags)
		return item.tags.find(tag => tag.title == tagName) != null;

	return false;
}

function getItemType(item) {
	return item.type ? item.type.names.map(s => "`" + s + "`").join(", ") : "any";
}

function resolveParams(item) {
	if (item.params)
		return item.params.map(p => resolveParam(p));

	return [];
}

function resolveParam(p) {
	let defaultValue = p.defaultvalue;
	if (defaultValue === undefined) {
		if (!p.optional && !p.nullable)
			defaultValue = "**required**";
		else
			defaultValue = "-";
	} else
		defaultValue = "`" + JSON.stringify(defaultValue, null, 2) + "`";

	return {
		name: p.name,
		description: p.description,
		type: getItemType(p),
		required: !p.optional && !p.nullable ? "**Yes**": "",
		defaultValue
	};
}

function resolveReturns(item) {
	if (item.returns && item.returns.length > 0) {
		let p = item.returns[0];

		return {
			description: p.description,
			type: getItemType(p)
		};
	}
	return null;
}

function resolveBadges(item) {
	let res = [];
	if (hasTag(item, "cached") || hasTag(item, "cache"))
		res.push("![Cached action](https://img.shields.io/badge/cache-true-blue.svg)");

	if (item.deprecated)
		res.push("![Deprecated action](https://img.shields.io/badge/status-deprecated-orange.svg)");

	return res;
}

function transformReadme({ doc, template }) {
	let module = doc.find(item => item.kind === "module");
	let modulePrefix = module ? module.longname : "";

	const transforms = {
		USAGE() {
			if (module && module.examples) {
				console.log(chalk.yellow.bold("Generating usage...\n"));

				return {
					examples: module.examples,
					hasExamples: module.examples && module.examples.length > 0
				};
			}
		},

		SETTINGS(doc) {
			console.log(chalk.yellow.bold("Generating settings..."));
			let prefix = modulePrefix + ".settings";
			let blocks = doc.filter(item => item.memberof && item.memberof.startsWith(prefix)).map(item => {
				let defaultValue = item.meta && item.meta.code ? item.meta.code.value : undefined;

				if (defaultValue != null) {
					if (!item.optional && !item.nullable)
						defaultValue = "**required**";
					else
						defaultValue = "`null`";
				} else
					defaultValue = "`" + JSON.stringify(defaultValue, null, 2) + "`";

				return {
					name: item.longname.replace(prefix + ".", ""),
					description: item.description,
					type: getItemType(item),
					defaultValue
				};
			});

			blocks.forEach(item => console.log(" - " + chalk.white.bold(item.name) + ": " + trunc(item.description)));
			console.log("");

			return blocks;
		},

		ACTIONS(doc) {
			console.log(chalk.yellow.bold("Generating actions..."));
			let blocks = doc.filter(item => hasTag(item, "actions")).map(item => {
				return {
					name: item.name,
					description: item.description,
					since: item.since,
					examples: item.examples,
					hasExamples: item.examples && item.examples.length > 0,
					deprecated: item.deprecated,
					badges: resolveBadges(item),
					params: resolveParams(item),
					returns: resolveReturns(item)
				};
			});

			blocks.forEach(item => console.log(" - " + chalk.white.bold(item.name) + ": " + trunc(item.description)));
			console.log("");

			return blocks;
		},

		METHODS(doc) {
			console.log(chalk.yellow.bold("Generating methods..."));
			let blocks = doc.filter(item => hasTag(item, "methods")).map(item => {
				return {
					name: item.name,
					description: item.description,
					since: item.since,
					examples: item.examples,
					hasExamples: item.examples && item.examples.length > 0,
					deprecated: item.deprecated,
					badges: resolveBadges(item),
					params: resolveParams(item),
					returns: resolveReturns(item)

				};
			});

			blocks.forEach(item => console.log(" - " + chalk.white.bold(item.name) + ": " + trunc(item.description)));
			console.log("");

			return blocks;
		}
	};

	_.forIn(transforms, (fn, name) => {
		let data = fn(doc);
		template = render(template, name, data);
	});

	return Promise.resolve(template);
}

function trunc(str) {
	return _.truncate(str, { length: 50 });
}

function render(template, name, data) {
	let reTemplate = new RegExp(`\\<\\!--\\s*?AUTO-CONTENT-TEMPLATE:${name}(?:\\r?\\n)+((?:.|\\s)*?)--\\>`, "g");

	let tmpl = reTemplate.exec(template);
	if (tmpl && tmpl.length > 1) {
		let render = handlebars.compile(tmpl[1], {
			noEscape: true,
			preventIndent: true
		});

		let reContent = new RegExp(`(\\<\\!--\\s*?AUTO-CONTENT-START:${name}\\s*?--\\>\\s?)((?:.|\\s)*?)(<!--\\s*?AUTO-CONTENT-END:${name}\\s*?--\\>)`, "g");

		let match = reContent.exec(template);

		let res = template.replace(reContent, "$1" + render(data) + "$3");
		//console.log(res);

		return res;
	}
	return template;
}

function convertTabs(content) {
	return content.replace(/\t/g, "    ");
}


function writeResult(content) {
	console.log(chalk.yellow.bold("Write results..."));
	console.log("  File: " + chalk.white.bold(flags.destination));
	//console.log(content);
	return fs.writeFileAsync(flags.destination, content, "utf8");
}


Promise.resolve(file)
	//.then(readFileContent)
	.then(parseWithJsDoc)
	.then(readTemplate)
	.then(transformReadme)
	.then(convertTabs)
	.then(writeResult)

	.then(() => {
		console.log(chalk.green.bold("\nDone!"));
	})

	.catch(err => {
		console.error(err);
		process.exit(2);
	});
