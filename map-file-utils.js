module.exports = (() => {
    const fs = require('fs');
    const stringify = require('json-stable-stringify');
    const toHexString = require('./save-file-utils.js').toHexString;

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
                if (!prevObj[key]) {
                    if (key === lastKey) {
                        prevObj[key] = value;
                    } else {
                        prevObj[key] = {};
                    }
                }
                return prevObj[key];
            }, obj);
        },
        splitKeyPath: (keypath) => {
            return keypath.split('/').reduce((acc, section) => {
                return acc.concat(section.split('.'));
            }, []);
        }
    };

    return MapFileUtils;
})();
