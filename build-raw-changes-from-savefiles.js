var readline = require('readline-sync');
var query = require('cli-interact').getYesNo;
var fs = require('fs');
var buildHexDiff = require('./build-hex-diff.js');
var CONFIG = require('./config.js');
var folderUtils = require('./folder-utils.js');

const _path = process.argv[5] || CONFIG.savepath;
const path = (_path.slice(-1) === '/') ? _path : _path + '/';
const beforeFilepath = `${path}` + process.argv[3];
const afterFilepath = `${path}` + process.argv[4];

const nameQuestionString = 'Name of change set: ';

var name = process.argv[2] || readline.question(nameQuestionString);
var isSure = !!name;
while (!name && !isSure) {
    isSure = query('Unnamed changes will likely be later overwritten. Are you sure?');
    if (!isSure) {
        name = readline.question(nameQuestionString);
    } else {
        name = 'unnamed';
    }
}

const filename = `raw/${name}.raw.changes`;
const filepath = path + filename;

folderUtils.buildFoldersIfTheyDoNotExist(filename);
buildHexDiff(filepath, beforeFilepath, afterFilepath);
console.log('Successfully created raw changefile!')
