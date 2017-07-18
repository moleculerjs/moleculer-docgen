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
	//fs.writeFileSync("./jsdoc.txt", JSON.stringify(doc, null, 4));
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

	const transforms = {
		USAGE(doc) {
			let module = doc.find(item => item.kind == "module");
			if (module && module.examples)
				return { 
					examples: module.examples 
				};
		}
	}

	return Promise.map(Object.keys(transforms), name => {
		let fn = transforms[name];
		let data = fn(doc);

		return render(template, name, data);
	});
}

function render(template, name, data) {

	//let render = handlebars.compile(templateFile);
	//return render(data);
}


function writeResult(content) {
	//return fs.writeFileAsync(flags.template, content, "utf8");
	console.log(content);
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
