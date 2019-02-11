var fs = require('fs');
var functions = require('../lib/cfdocs/data/en/all.json')
var tags = require('../lib/cfdocs/data/en/tags.json')

var cspell = {
	"id": "cfml-entities",
    "name": "CFML Entities",
	"version": "0.1",
	"dictionaryDefinitions": [
        { "name": "tags", "path": "./tags.txt"},
        { "name": "functions", "path": "./functions.txt"}
	],
	"languageSettings": [
		{ "languageId": "cfml", "dictionaries": ["tags", "functions"] }
	]
};

fs.writeFile('./build/cspell.json', JSON.stringify(cspell, null, '\t'),  'utf8',  function(err) {
	if (err) throw err;
	console.log('Wrote cspell.json');
});

var fileFunctions = './build/functions.txt';
fs.writeFile(fileFunctions, '', function(err) {
	if (err) throw err;

	var streamFunctions = fs.createWriteStream(fileFunctions, { flags:'a' });
	functions.related.forEach(function(f) {
		streamFunctions.write(f + '\n');
	});
	streamFunctions.end();
	console.log('Wrote functions.txt');
});

var fileTags = './build/tags.txt';
fs.writeFile(fileTags, '', function(err) {
	if (err) throw err;

	var streamTags = fs.createWriteStream(fileTags, { flags:'a' });
	tags.related.forEach(function(f) {
		streamTags.write(f + '\n');
	});
	streamTags.end();
	console.log('Wrote tags.txt');
});