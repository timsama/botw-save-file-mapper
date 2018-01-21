const fs = require('fs');
const CONFIG = require('./config.js');
const readline = require('readline-sync');

const folderUtils = require('./folder-utils.js');

const saveFilepath = `${CONFIG.savepath}game_data.sav`;
const captionFilepath = `${CONFIG.savepath}caption.sav`;
const imageFilepath = `${CONFIG.savepath}caption.jpg`;

const name = process.argv[2] || readline.question('Name of snapshot: ');

if (!!name) {
    const snapshotFilepath = `${CONFIG.snapshotspath + name}.sav`;
    const snapshotCaptionFilepath = `${CONFIG.snapshotspath + name}.caption.sav`;
    const snapshotImageFilepath = `${CONFIG.snapshotspath + name}.caption.jpg`;

    folderUtils.buildFoldersIfTheyDoNotExist(snapshotFilepath);
    fs.copyFileSync(saveFilepath, snapshotFilepath);
    fs.copyFileSync(captionFilepath, snapshotCaptionFilepath);
    fs.copyFileSync(imageFilepath, snapshotImageFilepath);

    console.log('Snapshot taken!')
} else {
    console.log('Unnamed snapshots not allowed.');
}
