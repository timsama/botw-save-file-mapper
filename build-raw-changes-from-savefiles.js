const nameGetter = require('./name-getter.js');
const fs = require('fs');
const buildHexDiff = require('./build-hex-diff.js');
const CONFIG = require('./config.js');
const folderUtils = require('./folder-utils.js');

const beforeFilepath = CONFIG.snapshotspath + process.argv[3];
const afterFilepath = CONFIG.snapshotspath + process.argv[4];

const name = nameGetter(process.argv[2], 'Name of change set: ', 'Unnamed changes will likely be later overwritten. Are you sure?');

const filename = `${name}.raw.changes`;
const filepath = CONFIG.rawchangespath + filename;

folderUtils.buildFoldersIfTheyDoNotExist(filepath);
buildHexDiff(filepath, beforeFilepath, afterFilepath);
console.log('Successfully created raw changefile!')
