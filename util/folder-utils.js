const fs = require('fs');
const CONFIG = require('../config.js');

const FolderUtils = {
    buildFoldersIfTheyDoNotExist: (filepath) => {
        const folders = [].concat(filepath.split('/')).slice(0, -1);
        const qualifiedFolders = folders.reduce((acc, next) => {
            return acc.concat(acc.slice(-1).concat(next).join('/'));
        }, []);

        qualifiedFolders.forEach((folder) => {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
        });
    }
}

module.exports = FolderUtils;
