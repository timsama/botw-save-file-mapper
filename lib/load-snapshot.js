module.exports = (name) => {
    const fs = require('fs');
    const CONFIG = require('../config.json');
    const readline = require('readline-sync');

    const saveFilepath = `${CONFIG.savepath}game_data.sav`;
    const captionFilepath = `${CONFIG.savepath}caption.sav`;
    const imageFilepath = `${CONFIG.savepath}caption.jpg`;

    const saveFileBackup = `${CONFIG.backuppath}game_data.sav`;

    const snapshotFilepath = `${CONFIG.snapshotspath + name}.sav`;
    const snapshotCaptionFilepath = `${CONFIG.snapshotspath + name}.caption.sav`;
    const snapshotImageFilepath = `${CONFIG.snapshotspath + name}.caption.jpg`;

    if (fs.existsSync(snapshotFilepath)) {
        if (fs.existsSync(saveFileBackup)) {
            fs.copyFileSync(snapshotFilepath, saveFilepath);
            if (fs.existsSync(snapshotCaptionFilepath)) {
                fs.copyFileSync(snapshotCaptionFilepath, captionFilepath);
            }
            if (fs.existsSync(snapshotImageFilepath)) {
                fs.copyFileSync(snapshotImageFilepath, imageFilepath);
            }

            console.log('Snapshot loaded!');
            return true;
        } else {
            console.log('Snapshots cannot be loaded when no backup exists. Run "make-backup" to create one.');
            return false;
        }
    } else {
        console.log(`Snapshot "${name}" not found.`);
        return false;
    }
};
