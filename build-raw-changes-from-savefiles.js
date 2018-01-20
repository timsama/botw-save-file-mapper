const nameGetter = require('./name-getter.js');
const fs = require('fs');
const buildHexDiff = require('./build-hex-diff.js');
const CONFIG = require('./config.js');
const folderUtils = require('./folder-utils.js');

const _path = process.argv[5] || CONFIG.savepath;
const path = (_path.slice(-1) === '/') ? _path : _path + '/';
const beforeFilepath = `${path}` + process.argv[3];
const afterFilepath = `${path}` + process.argv[4];

const name = nameGetter(process.argv[2], 'Name of change set: ', 'Unnamed changes will likely be later overwritten. Are you sure?');

const filename = `raw/${name}.raw.changes`;
const filepath = path + filename;

folderUtils.buildFoldersIfTheyDoNotExist(filename);
buildHexDiff(filepath, beforeFilepath, afterFilepath);
console.log('Successfully created raw changefile!')
