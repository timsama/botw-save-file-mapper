const SaveFile  = require('../model/savefile.model.js');
const CONFIG = require('../config.json');
const saveFile = CONFIG.savepath + 'game_data.sav';
const MapFileUtils = require('../util/map-file-utils.js');
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


const isSkipSoftDependencies = entry => entry == 'skip-soft-dependencies' || entry == 'skip-soft-deps';
const isWithLogging = entry => entry == 'with-logging';

const skipSoftDependencies = process.argv.slice(3).some(isSkipSoftDependencies);
const withLogging = process.argv.slice(3).some(isWithLogging);

const options = {
    skipSoftDependencies: skipSoftDependencies,
    withLogging: withLogging,
};

const modelJson = MapFileUtils.getFileAsJsonOrEmptyJsObject(`${CONFIG.exportpath}${inputFilename}`);

SaveFile.write(modelJson, saveFile, options);
