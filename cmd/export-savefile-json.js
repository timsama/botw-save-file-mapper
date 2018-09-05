const SaveFile  = require('../model/savefile.model.js');
const CONFIG = require('../config.js');
const saveFile = CONFIG.savepath + 'game_data.sav';
const MapFileUtils = require('../map-file-utils.js');
const readline = require('readline-sync');

const rawOutputFilename = process.argv[2] || readline.question('Name of output JSON file? ');
const outputFilename = (() => {
    const [extension] = rawOutputFilename.split('.').reverse();
    if (extension.toLowerCase() === 'json') {
        return rawOutputFilename;
    } else {
        return rawOutputFilename + '.json';
    }
})();

const saveJson = SaveFile.read(saveFile);

MapFileUtils.saveJsonFile(`${CONFIG.exportpath}${outputFilename}`, saveJson);
