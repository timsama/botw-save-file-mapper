const nameGetter = require('./name-getter.js');
const fs = require('fs');
const CONFIG = require('./config.js');
const folderUtils = require('./folder-utils.js');

const saveFilepath = `${CONFIG.savepath}game_data.sav`;
const captionFilepath = `${CONFIG.savepath}caption.sav`;
const imageFilepath = `${CONFIG.savepath}caption.jpg`;

const saveFileBackup = `${CONFIG.backuppath}game_data.sav`;
const captionFileBackup = `${CONFIG.backuppath}caption.sav`;
const imageFileBackup = `${CONFIG.backuppath}caption.jpg`;

const args = process.argv.slice(2);
const keepBackup = args.indexOf('keep-backup') !== -1;

if (fs.existsSync(saveFileBackup)) {
    fs.unlinkSync(saveFilepath);
    fs.unlinkSync(captionFilepath);
    fs.unlinkSync(imageFilepath);

    if (keepBackup) {
        fs.copyFileSync(saveFileBackup, saveFilepath);
        fs.copyFileSync(captionFileBackup, captionFilepath);
        fs.copyFileSync(imageFileBackup, imageFilepath);

        console.log('Backup restored! (Backup copy retained.)');
    } else {
        fs.renameSync(saveFileBackup, saveFilepath);
        fs.renameSync(captionFileBackup, captionFilepath);
        fs.renameSync(imageFileBackup, imageFilepath);

        console.log('Backup restored! (Backup copy deleted.)');
    }
} else {
    console.log('No backup exists.');
}
