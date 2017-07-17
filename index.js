"use strict";

const args = require("args");
const fs = require("fs");

const jsdoc = require('jsdoc-api');

const flags = args.parse(process.argv);
const files = args.sub;

console.log("Files to parse:", files);

function parse(file) {
	let docs = jsdoc.explainSync({ files: [file] });

	console.log(docs);

	fs.writeFileSync("./docs.txt", JSON.stringify(docs, null, 4));

	var dox = require('dox'),
		code = "...";

	var obj = dox.parseComments(fs.readFileSync(file, "utf8"));
	fs.writeFileSync("./dox.txt", JSON.stringify(obj, null, 4));
}

files.forEach(parse);
