const nameGetter = require('./name-getter.js');
const fs = require('fs');
const CONFIG = require('./config.js');
const folderUtils = require('./folder-utils.js');

const saveFilepath = `${CONFIG.savepath}game_data.sav`;

const name = nameGetter(process.argv[2], 'Name of snapshot: ', 'Unnamed snapshots will likely be later overwritten. Are you sure?');

const filename = `${name}.sav`;
const filepath = CONFIG.snapshotspath + filename;

folderUtils.buildFoldersIfTheyDoNotExist(filepath);
fs.copyFileSync(saveFilepath, filepath);

console.log('Snapshot taken!')
