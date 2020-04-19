module.exports = (saveFileOverride) => {
    const fs = require('fs');
    const arrayUtils = require('../util/array-utils.js');
    const saveFileUtils = require('../util/save-file-utils.js');
    const CONFIG = require('../config.json');
    const mapFileUtils = require('../util/map-file-utils.js');
    const readline = require('readline-sync');
    const float32 = require('../encoders_decoders/float32.js');
    const asciiReader = require('./read-ascii-at-offset.js');
    
    const saveFilename = 'game_data.sav';
    const saveFilepath = saveFileOverride || `${CONFIG.savepath}${saveFilename}`;
    const jsonEffectMapFile = `${CONFIG.mapfilepath}effectmap.json`;

    const checkValues = (effectMapFile, names, withLogging) => {
        const mapFile = effectMapFile || jsonEffectMapFile;
        const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(mapFile);

        return saveFileUtils.withBinaryFileSync(saveFilepath, (binary) => {
            const alreadyCheckedChanges = {};

            const readAtOffset = saveFileUtils.buildReader('uint32', binary);
            const readAsciiAtOffset = asciiReader(saveFilepath, readAtOffset);

            const isEmpty = (value) => !value && value !== 0;

            const checkValue = (name) => {
                if (!alreadyCheckedChanges[name]) {
                    let [keypath, value] = name.split('=');
                    const effect = mapFileUtils.getValueAtKeyPath(effectMap, keypath);

                    if (withLogging) {
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
                                return effect.harddependencies.every(depName => {
                                    return alreadyCheckedChanges[depName] === true || alreadyCheckedChanges[depName].value
                                });
                            } else {
                                return true;
                            }
                        })();

                        const variableValuesExist = effect.entries.some(entry => ['float', 'integer', 'ascii', '8utf8', '20utf8', '24utf8'].includes(entry.value));

                        const entryGivesExpectedValue = (entry) => {
                            if (entry.value === true) {
                                return !!readAtOffset(entry.offset) === true;
                            } else if (entry.value === false) {
                                return !!readAtOffset(entry.offset) === false;
                            } else {
                                return readAtOffset(entry.offset) == entry.value;
                            }
                        }

                        if (allHardDepsAreTrue && variableValuesExist) {
                            const result = {
                                key: name,
                                value: effect.entries.map((entry) => {
                                    if (entry.value === 'ascii') {
                                        return readAsciiAtOffset(entry.offset, entry.length);
                                    } else if (['8utf8', '20utf8', '24utf8'].includes(entry.value)) {
                                        let rawstr = binary.read(entry.value, entry.offset);
                                        return rawstr.substring(0, rawstr.indexOf('\u0000'));
                                    } else if (entry.value === 'float') {
                                        return float32.decode(readAtOffset(entry.offset));
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
                                value: effect.entries.every(entryGivesExpectedValue)
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
