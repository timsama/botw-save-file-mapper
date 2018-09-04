module.exports = (saveFileOverride) => {
    const fs = require('fs');
    const arrayUtils = require('./array-utils.js');
    const saveFileUtils = require('./save-file-utils.js');
    const CONFIG = require('./config.js');
    const mapFileUtils = require('./map-file-utils.js');
    const readline = require('readline-sync');
    const float28 = require('./encoders_decoders/float28.js');
    
    const saveFilename = 'game_data.sav';
    const saveFilepath = saveFileOverride || `${CONFIG.savepath}${saveFilename}`;
    const jsonEffectMapFile = `${CONFIG.exportpath}effectmap.json`;

    const checkValues = (effectMapFile, names, logChangeNames) => {
        const mapFile = effectMapFile || jsonEffectMapFile;
        const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(mapFile);

        return saveFileUtils.withBinaryFileSync(saveFilepath, (binary) => {
            const alreadyCheckedChanges = {};

            const readAtOffset = saveFileUtils.buildReader('uint32', binary);

            const isEmpty = (value) => !value && value !== 0;

            const checkValue = (name) => {
                if (!alreadyCheckedChanges[name]) {
                    let [keypath, value] = name.split('=');
                    const effect = mapFileUtils.getValueAtKeyPath(effectMap, keypath);

                    if (logChangeNames) {
                        console.log(`Checking ${keypath}`);
                    }

                    if (!effect || !effect.entries) {
                        throw ('Entry ' + name + ' does not exist');
                    } else {
                        // if this doesn't go before the dependencies, we can get into cycles of dependencies
                        alreadyCheckedChanges[name] = true;

                        const hardDependencies = (() => {
                            if (!!effect.harddependencies && effect.harddependencies.length > 0) {
                                return effect.harddependencies.map(checkValue);
                            } else {
                                return [];
                            }
                        })();

                        const allHardDepsAreTrue = (() => {
                            if (!!effect.harddependencies && effect.harddependencies.length > 0) {
                                return effect.harddependencies.every(depName => alreadyCheckedChanges[depName].value);
                            } else {
                                return true;
                            }
                        })();

                        const variableValuesExist = effect.entries.some(entry => entry.value === 'float' || entry.value === 'integer');

                        if (allHardDepsAreTrue && variableValuesExist) {
                            const result = {
                                key: name,
                                value: effect.entries.map((entry) => {
                                    if (entry.value === 'float') {
                                        return float28.decode(readAtOffset(entry.offset));
                                    } else {
                                        return readAtOffset(entry.offset)
                                    } 
                                })[0]
                            };
                            alreadyCheckedChanges[name] = result;
                            return hardDependencies.concat([result]);
                        } else if (allHardDepsAreTrue) {
                            const result = {
                                key: name,
                                value: effect.entries.every(entry => readAtOffset(entry.offset) == entry.value)
                            };
                            alreadyCheckedChanges[name] = result;
                            return hardDependencies.concat([result]);
                        } else {
                            const result = {
                                key: name,
                                value: false
                            };
                            alreadyCheckedChanges[name] = result;
                            return hardDependencies.concat([result]);
                        }
                    }
                } else {
                    return undefined;
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

            const retVal = {};
            arrayUtils.flatten(expandedNames.map(checkValue)).filter(entry => entry !== undefined).forEach(entry => {
                retVal[entry.key] = entry.value;
            });

            return retVal;
        });
    };

    return checkValues;
};
