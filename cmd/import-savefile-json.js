const SaveFile  = require('../model/savefile.model.js');
const CONFIG = require('../config.js');
const saveFile = CONFIG.savepath + 'game_data.sav';
const MapFileUtils = require('../map-file-utils.js');
const readline = require('readline-sync');

const rawInputFilename = process.argv[2] || readline.question('Name of input JSON file? ');
const inputFilename = (() => {
    const hasNoExtension = rawInputFilename.split('.').length === 1;
    if (hasNoExtension) {
        return rawInputFilename + '.json';
    } else {
        return rawInputFilename;
    }
})();

const modelJson = MapFileUtils.getFileAsJsonOrEmptyJsObject(`${CONFIG.exportpath}${inputFilename}`);

SaveFile.write(modelJson, saveFile, true);
