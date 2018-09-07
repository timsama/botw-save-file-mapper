module.exports = (saveFileOverride, isAsync) => {
    const fs = require('fs');
    const arrayUtils = require('../util/array-utils.js');
    const jBinary = require('jbinary');
    const saveFileUtils = require('../util/save-file-utils.js');
    const CONFIG = require('../config.js');
    const mapFileUtils = require('../util/map-file-utils.js');
    const readline = require('readline-sync');
    const float28 = require('../encoders_decoders/float28.js');
    
    const saveFilename = 'game_data.sav';
    const saveFilepath = saveFileOverride || `${CONFIG.savepath}${saveFilename}`;
    const jsonEffectMapFile = `${CONFIG.mapfilepath}effectmap.json`;

    const applyChanges = (effectMapFile, names, skipSoftDependencies, logChangeNames) => {
        const mapFile = effectMapFile || jsonEffectMapFile;

        return saveFileUtils.withBinaryFileSync(saveFilepath, (binary) => {
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
                        // if this doesn't go before the dependencies, we can get into cycles of soft deps
                        alreadyAppliedChanges[name] = true;

                        if (!!effect.harddependencies && effect.harddependencies.length > 0) {
                            effect.harddependencies.forEach(applyChange);
                        }

                        if (!skipSoftDependencies && !!effect.softdependencies && effect.softdependencies.length > 0) {
                            effect.softdependencies.forEach(applyChange);
                        }

                        const variableValuesExist = effect.entries.some(entry => entry.value === 'float' || entry.value === 'integer');

                        if (variableValuesExist) {
                            if (isEmpty(value)) {
                                const unitEntry = effect.entries.find(entry => !!entry.unit);
                                const unit = unitEntry && unitEntry.unit;
                                value = parseInt(readline.question(`${keypath} is a variable value with unit "${unit}". What would you like to set it to? `));
                            }
                        }

                        if (!(variableValuesExist && isEmpty(value))) {
                            effect.entries.forEach((entry) => {
                                if (entry.value === 'integer') {
                                    writeToOffset(entry.offset, value);
                                } else if (entry.value === 'float') {
                                    writeToOffset(entry.offset, float28.encode(value));
                                } else if (entry.value === true) {
                                    writeToOffset(entry.offset, 1);
                                } else if (entry.value === false) {
                                    writeToOffset(entry.offset, 0);
                                } else {
                                    writeToOffset(entry.offset, entry.value);
                                }
                            });
                        }
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

            if (isAsync) {
                return binary.saveAs(saveFilepath);
            } else {
                binary.saveAsSync(saveFilepath);
            }
        });
    };

    return applyChanges;
};
