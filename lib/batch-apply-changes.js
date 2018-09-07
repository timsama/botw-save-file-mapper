module.exports = (saveFileOverride) => {
    const fs = require('fs');
    const arrayUtils = require('../util/array-utils.js');
    const saveFileUtils = require('../util/save-file-utils.js');
    const CONFIG = require('../config.js');
    const mapFileUtils = require('../util/map-file-utils.js');
    const readline = require('readline-sync');
    const float28 = require('../encoders_decoders/float28.js');
    const batchOffsetSetter = require('./batch-offset-setter.js');
    
    const saveFilename = 'game_data.sav';
    const saveFilepath = saveFileOverride || `${CONFIG.savepath}${saveFilename}`;
    const jsonEffectMapFile = `${CONFIG.mapfilepath}effectmap.json`;

    const applyChanges = (effectMapFile, names, skipSoftDependencies, logChangeNames) => {
        const mapFile = effectMapFile || jsonEffectMapFile;

        const queuedChanges = {};

        const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(mapFile);

        const isEmpty = (value) => !value && value !== 0;

        const queueChange = (name) => {
            if (!queuedChanges[name]) {
                let [keypath, value] = name.split('=');
                const effect = mapFileUtils.getValueAtKeyPath(effectMap, keypath);

                if (logChangeNames) {
                    console.log(`Applying ${keypath}`);
                }

                if (!effect || !effect.entries) {
                    throw ('Entry ' + name + ' does not exist');
                } else {
                    // if this doesn't go before the dependencies, we can get into cycles of soft deps
                    queuedChanges[name] = true;

                    if (!!effect.harddependencies && effect.harddependencies.length > 0) {
                        effect.harddependencies.forEach(queueChange);
                    }

                    if (!skipSoftDependencies && !!effect.softdependencies && effect.softdependencies.length > 0) {
                        effect.softdependencies.forEach(queueChange);
                    }

                    const variableValuesExist = effect.entries.some(entry => entry.value === 'float' || entry.value === 'integer');

                    if (variableValuesExist && value === undefined) {
                        console.log(`No value provided for keypath ${name}!`);
                        return undefined;
                    }

                    queuedChanges[name] = effect.entries.map((entry) => {
                        if (entry.value === 'integer') {
                            return {
                                offset: entry.offset,
                                value: value
                            };
                        } else if (entry.value === 'float') {
                            return {
                                offset: entry.offset,
                                value: float28.encode(value)
                            };
                        } else if (entry.value === true) {
                            return {
                                offset: entry.offset,
                                value: 1
                            };
                        } else if (entry.value === false) {
                            return {
                                offset: entry.offset,
                                value: 0
                            };
                        } else {
                            return entry;
                        }
                    });
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

        expandedNames.forEach(queueChange);

        const entries = arrayUtils.flatten(Object.keys(queuedChanges).map(key => {
            return queuedChanges[key];
        }));

        return batchOffsetSetter(entries, saveFilepath);
    };

    return applyChanges;
};
