"use strict";

const _ 				= require("lodash");
const args 				= require("args");
//const fs 				= require("fs");
const path 				= require("path");
const handlebars 		= require("handlebars");
const Promise 			= require("bluebird");
const fs 				= Promise.promisifyAll(require("fs"));

args.option(["t", "template"], "'The template README file path", "./README.md");
const flags = args.parse(process.argv);

if (args.sub.length == 0) {
	console.error("Please set a filename!");
	process.exit(1);
}

const file = args.sub[0];

function parseWithJsDoc(file) {
	const jsdoc = require('jsdoc-api');

	let doc = jsdoc.explainSync({ files: [file] });
	fs.writeFileSync("./jsdoc.txt", JSON.stringify(doc, null, 4));
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
	}
}

function resolveReturns(item) {
	if (item.returns && item.returns.length > 0) {
		let p = item.returns[0];

		return {
			description: p.description,
			type: getItemType(p)
		}
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
	let module = doc.find(item => item.kind == "module");
	let modulePrefix = module ? module.longname : "";

	const transforms = {
		USAGE(doc) {
			if (module && module.examples)
				return { 
					examples: module.examples 
				};
		},

		SETTINGS(doc) {
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

			return blocks;
		},

		ACTIONS(doc) {
			let blocks = doc.filter(item => hasTag(item, "actions")).map(item => {
				return {
					name: item.name,
					description: item.description,
					since: item.since,
					examples: item.examples,
					deprecated: item.deprecated,
					badges: resolveBadges(item),
					params: resolveParams(item),
					returns: resolveReturns(item)
				};
			});

			return blocks;
		},

		METHODS(doc) {
			let blocks = doc.filter(item => hasTag(item, "methods")).map(item => {
				return {
					name: item.name,
					description: item.description,
					since: item.since,
					examples: item.examples,
					deprecated: item.deprecated,
					badges: resolveBadges(item),
					params: resolveParams(item),
					returns: resolveReturns(item)

				};
			});

			return blocks;
		}
	}

	_.forIn(transforms, (fn, name) => {
		let data = fn(doc);
		template = render(template, name, data);
	});

	return Promise.resolve(template);
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
		console.log(res);

		return res;
	}
}

function convertTabs(content) {
	return content.replace(/\t/g, "    ");
}


function writeResult(content) {
	console.log(content);
	return fs.writeFileAsync(flags.template, content, "utf8");
}


Promise.resolve(file)
	//.then(readFileContent)
	.then(parseWithJsDoc)
	.then(readTemplate)
	.then(transformReadme)
	.then(convertTabs)
	.then(writeResult)

	.catch(err => {
		console.error(err);
		process.exit(2);
	});
