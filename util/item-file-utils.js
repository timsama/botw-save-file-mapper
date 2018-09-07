module.exports = (() => {
    const fs = require('fs');
    const CONFIG = require('../config.json');
    const stringify = require('json-stable-stringify');
    const toHexString = require('./save-file-utils.js').toHexString;
    const objUtils = require('./obj-utils.js');

    const MapFileUtils = {
        getCategoryFilepath: (category) => {
            if (MapFileUtils.validCategories.indexOf(category) !== -1) {
                return `${CONFIG.mapfilepath}${category}.json`;
            } else {
                return undefined;
            }
        }, 
        getFileAsJsonOrEmptyJsObject: (filepath) => {
            if (fs.existsSync(filepath)) {
                return objUtils.decorate(JSON.parse(fs.readFileSync(filepath, 'utf8')));
            } else {
                return objUtils.decorate({});
            }
        },
        saveJsonFile: (filepath, json) => {
            const finalJson = !!json.eject ? json.eject() : json;
            fs.writeFileSync(filepath, stringify(finalJson, {space: 2}));
        },
        validCategories: [
            'weapons',
            'bows',
            'arrows',
            'shields',
            'armor',
            'materials',
            'food',
            'keyitems'
        ]
    };

    return MapFileUtils;
})();
