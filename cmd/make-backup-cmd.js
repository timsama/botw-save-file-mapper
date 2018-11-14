const fs = require('fs');
const CONFIG = require('../config.json');
const folderUtils = require('../util/folder-utils.js');
const query = require('cli-interact').getYesNo;

const saveFilepath = `${CONFIG.savepath}game_data.sav`;
const captionFilepath = `${CONFIG.savepath}caption.sav`;
const imageFilepath = `${CONFIG.savepath}caption.jpg`;

const saveFileBackup = `${CONFIG.backuppath}game_data.sav`;
const captionFileBackup = `${CONFIG.backuppath}caption.sav`;
const imageFileBackup = `${CONFIG.backuppath}caption.jpg`;

if (fs.existsSync(saveFileBackup)) {
    const areYouSureString = 'Continuing will overwrite the existing backup. This action cannot be undone. Are you sure?';
    const isSure = query(areYouSureString);

    if (isSure) {
        if (fs.existsSync(saveFileBackup)) {
            fs.unlinkSync(saveFileBackup);
        }
        if (fs.existsSync(captionFileBackup)) {
            fs.unlinkSync(captionFileBackup);
        }
        if (fs.existsSync(imageFileBackup)) {
            fs.unlinkSync(imageFileBackup);
        }

        fs.copyFileSync(saveFilepath, saveFileBackup);
        fs.copyFileSync(captionFilepath, captionFileBackup);
        fs.copyFileSync(imageFilepath, imageFileBackup);

        console.log('Backup created.');
    } else {
        console.log('No changes made.');
    }
} else {
    folderUtils.buildFoldersIfTheyDoNotExist(saveFileBackup);

    fs.copyFileSync(saveFilepath, saveFileBackup);
    fs.copyFileSync(captionFilepath, captionFileBackup);
    fs.copyFileSync(imageFilepath, imageFileBackup);

    console.log('Backup created.');
}
