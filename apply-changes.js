module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./save-file-utils.js');
    const CONFIG = require('./config.js');
    const mapFileUtils = require('./map-file-utils.js');
    const readline = require('readline-sync');
    
    const saveFilename = 'game_data.sav';
    const saveFilepath = `${CONFIG.savepath}${saveFilename}`;
    const jsonEffectMapFile = `${CONFIG.exportpath}effectmap.json`;

    return (names) => {
        jBinary.load(saveFilepath, saveFileUtils.typeSet, function (err, binary) {
            const writeToOffset = saveFileUtils.buildWriter('uint32', binary);

            const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(jsonEffectMapFile);

            const isEmpty = (value) => !value && value !== 0;

            names.forEach((name) => {
                let [keypath, value] = name.split('=');
                const entries = mapFileUtils.getValueAtKeyPath(effectMap, keypath);
                const variableValuesExist = entries.some(entry => entry.value === 'variable');

                if (variableValuesExist) {
                    if (isEmpty(value)) {
                        value = parseInt(readline.question(`${keypath} is a variable value. What would you like to set it to?`));
                    }
                }

                if (!(variableValuesExist && isEmpty(value))) {
                    entries.forEach((entry) => {
                        if (entry.value === 'variable') {
                            writeToOffset(entry.offset, value);
                        } else {
                            writeToOffset(entry.offset, entry.value);
                        }
                    });
                }
            });

            binary.saveAs(saveFilepath);
        });
    };
})();
