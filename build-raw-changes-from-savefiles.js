const nameGetter = require('./name-getter.js');
const fs = require('fs');
const buildHexDiff = require('./build-hex-diff.js');
const CONFIG = require('./config.js');
const folderUtils = require('./folder-utils.js');

let beforeFilepath = CONFIG.snapshotspath + process.argv[3];
if (beforeFilepath.split('').slice(-4).join('') !== '.sav') {
    beforeFilepath = beforeFilepath + '.sav';
}

let afterFilepath = CONFIG.snapshotspath + process.argv[4];
if (afterFilepath.split('').slice(-4).join('') !== '.sav') {
    afterFilepath = afterFilepath + '.sav';
}


const name = nameGetter.getOptional(process.argv[2], 'Name of change set: ', 'Unnamed changes will likely be later overwritten. Are you sure?');

const filename = `${name}.raw.changes`;
const filepath = CONFIG.rawchangespath + filename;

folderUtils.buildFoldersIfTheyDoNotExist(filepath);
buildHexDiff(filepath, beforeFilepath, afterFilepath);
console.log('Successfully created raw changefile!');
