"use strict";

const _ 				= require("lodash");
const args 				= require("args");
//const fs 				= require("fs");
const path 				= require("path");
const handlebars 		= require("handlebars");
const markdownMagic 	= require("markdown-magic");
const Promise 			= require("bluebird");
const fs 				= Promise.promisifyAll(require("fs"));

args.option(["t", "template"], "'The template README file path", "./README.md");
const flags = args.parse(process.argv);

//console.log(flags);

if (args.sub.length == 0) {
	console.error("Please set a filename!");
	process.exit(1);
}

const file = args.sub[0];

/*function readFileContent(file) {
	return fs.readFile(file);
}*/

function parseWithJsDoc(file) {
	const jsdoc = require('jsdoc-api');

	let doc = jsdoc.explainSync({ files: [file] });
	fs.writeFileSync("./jsdoc.txt", JSON.stringify(doc, null, 4));
	return doc;
}

function parseWithDox(content) {
	const dox = require('dox')

	let doc = dox.parseComments(fs.readFileSync(file, "utf8"));
	//fs.writeFileSync("./dox.txt", JSON.stringify(doc, null, 4));
	return doc;
}

function readTemplate(doc) {
	return fs.readFileAsync(flags.template, "utf8").then(template => ({
		doc,
		template
	}));
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
			let blocks = doc.filter(item => item.memberof == modulePrefix + ".settings").map(item => {
				let value = item.meta && item.meta.code ? item.meta.code.value : undefined;

				let defaultValue;
				if (value !== undefined) {
					if (value === null) {
						if (item.nullable || item.optional)
							defaultValue = "`null`"
						else
							defaultValue = "**required**"
					} else {
						 defaultValue = "`" + JSON.stringify(item.meta.code.value, null, 2) + "`";
					}
				}

				return {
					name: item.name,
					description: item.description,
					type: item.type ? item.type.names.map(s => "`" + s + "`").join(", ") : "any",
					defaultValue
				};
			});

			return blocks;
		},

		ACTIONS(doc) {
			return {};
		},

		METHODS(doc) {
			return {};
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


function writeResult(content) {
	console.log(content);
	return fs.writeFileAsync(flags.template + "new.md", content, "utf8");
}


Promise.resolve(file)
	//.then(readFileContent)
	.then(parseWithJsDoc)
	.then(readTemplate)
	.then(transformReadme)
	.then(writeResult)

	.catch(err => {
		console.error(err);
		process.exit(2);
	});
