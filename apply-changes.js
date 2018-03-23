module.exports = (saveFileOverride) => {
    const fs = require('fs');
    const arrayUtils = require('./array-utils.js');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./save-file-utils.js');
    const CONFIG = require('./config.js');
    const mapFileUtils = require('./map-file-utils.js');
    const readline = require('readline-sync');
    
    const saveFilename = 'game_data.sav';
    const saveFilepath = saveFileOverride || `${CONFIG.savepath}${saveFilename}`;
    const jsonEffectMapFile = `${CONFIG.exportpath}effectmap.json`;

    const applyChanges = (effectMapFile, names, skipSoftDependencies, logChangeNames) => {
        const mapFile = effectMapFile || jsonEffectMapFile;

        saveFileUtils.withBinaryFileSync(saveFilepath, (binary) => {
            const alreadyAppliedChanges = {};

            const writeToOffset = saveFileUtils.buildWriter('uint32', binary);

            const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(mapFile);

            const isEmpty = (value) => !value && value !== 0;

            const applyChange = (name) => {
                if (!alreadyAppliedChanges[name]) {
                    let [keypath, value] = name.split('=');
                    const effect = mapFileUtils.getValueAtKeyPath(effectMap, keypath);

                    if (logChangeNames) {
                        console.log(`Applying ${keypath}`);
                    }

                    if (!effect || !effect.entries) {
                        throw ('Entry ' + name + ' does not exist');
                    } else {
                        if (!!effect.harddependencies && effect.harddependencies.length > 0) {
                            effect.harddependencies.forEach(applyChange);
                        }

                        if (!skipSoftDependencies && !!effect.softdependencies && effect.softdependencies.length > 0) {
                            effect.softdependencies.forEach(applyChange);
                        }

                        const variableValuesExist = effect.entries.some(entry => entry.value === 'variable');

                        if (variableValuesExist) {
                            if (isEmpty(value)) {
                                value = parseInt(readline.question(`${keypath} is a variable value. What would you like to set it to? `));
                            }
                        }

                        if (!(variableValuesExist && isEmpty(value))) {
                            effect.entries.forEach((entry) => {
                                if (entry.value === 'variable') {
                                    writeToOffset(entry.offset, value);
                                } else {
                                    writeToOffset(entry.offset, entry.value);
                                }
                            });
                        }

                        alreadyAppliedChanges[name] = true;
                    }
                }
            };

            const expandedNames = arrayUtils.flatten(names.map(name => {
                const path = name.split('.');
                const last = path.slice(-1)[0];
                const suffixes = last.split(',');
                const prefix = path.slice(0, -1).join('.');
                return suffixes.map(suffix => {
                    if (!!prefix) {
                        return prefix + '.' + suffix;
                    } else {
                        return suffix;
                    }
                });
            }));

            expandedNames.forEach(applyChange);

            binary.saveAsSync(saveFilepath);
        });
    };

    return applyChanges;
};
