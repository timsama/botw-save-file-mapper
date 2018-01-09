var fs = require('fs');
var jBinary = require('jbinary');
var saveFileUtils = require('./save-file-utils.js');
var CONFIG = require('./config.js');

const names = process.argv.slice(2) || ['unnamed'];
const path = CONFIG.savepath;
const saveFilename = 'game_data.sav';
const saveFilepath = `${path}/${saveFilename}`;

jBinary.load(saveFilepath, saveFileUtils.typeSet, function (err, binary) {
    const writeToOffset = saveFileUtils.buildWriter('uint32', binary);

    names.forEach((name) => {
        const changesFilename = name + '.changes';
        const changesFilepath = `${path}changes/${changesFilename}`;

            saveFileUtils.getChangesToApply(changesFilepath).forEach((entry) => {
               writeToOffset(entry.offset, entry.value);
            });
    });

    binary.saveAs(saveFilepath);
});
