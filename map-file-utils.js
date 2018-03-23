module.exports = (() => {
    const fs = require('fs');
    const CONFIG = require('./config.js');
    const stringify = require('json-stable-stringify');
    const toHexString = require('./save-file-utils.js').toHexString;
    const jsonOffsetMapFile = `${CONFIG.exportpath}offsetmap.json`;

    const MapFileUtils = {
        appendOffsetEffects: (obj, entries, effect) => {
            entries.forEach((entry) => {
                const offset = toHexString(entry.offset);
                if (obj[offset]) {
                    const existingString = obj[offset];
                    const existingEffects = existingString.replace('Affects ', '').split(', ');
                    if (existingEffects.indexOf(effect) === -1) {
                        obj[offset] = `${existingString}, ${effect}`;
                    }
                } else {
                    obj[offset] = `Affects ${effect}`;
                }
            });
        },
        getFileAsJsonOrEmptyJsObject: (filepath) => {
            if (fs.existsSync(filepath)) {
                return JSON.parse(fs.readFileSync(filepath, 'utf8'));
            } else {
                return {};
            }
        },
        getKnownOffsetsFilter: (offsetMapJson) => {
            const offsetMap = offsetMapJson || MapFileUtils.getFileAsJsonOrEmptyJsObject(jsonOffsetMapFile);

            return (entry) => {
                return offsetMap[toHexString(entry.offset)] === undefined;
            };
        },
        getValueAtKeyPath: (obj, keypath) => {
            const keys = MapFileUtils.splitKeyPath(keypath);

            return keys.reduce((prevObj, key) => {
                if (!!prevObj) {
                    return prevObj[key];
                }
            }, obj);
        },
        saveJsonFile: (filepath, json) => {
            fs.writeFileSync(filepath, stringify(json, {space: 2}));
        },
        setValueAtKeyPath: (obj, keypath, value) => {
            const keys = MapFileUtils.splitKeyPath(keypath);
            const lastKey = keys.slice(-1)[0];

            keys.reduce((prevObj, key) => {
                if (key === lastKey) {
                    prevObj[key] = value;
                } else if (!prevObj[key]) {
                    prevObj[key] = {};
                }
                return prevObj[key];
            }, obj);
        },
        splitKeyPath: (keypath) => {
            return keypath.toLowerCase().split('/').reduce((acc, section) => {
                return acc.concat(section.split('.'));
            }, []);
        }
    };

    return MapFileUtils;
})();
