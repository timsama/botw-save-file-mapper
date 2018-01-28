module.exports = (() => {
    const fs = require('fs');
    const CONFIG = require('./config.js');
    const stringify = require('json-stable-stringify');
    const toHexString = require('./save-file-utils.js').toHexString;

    const MapFileUtils = {
        getCategoryFilepath: (category) => {
            if (MapFileUtils.validCategories.indexOf(category) !== -1) {
                return `${CONFIG.exportpath}${category}.json`;
            } else {
                return undefined;
            }
        }, 
        getFileAsJsonOrEmptyJsObject: (filepath) => {
            if (fs.existsSync(filepath)) {
                return JSON.parse(fs.readFileSync(filepath, 'utf8'));
            } else {
                return {};
            }
        },
        saveJsonFile: (filepath, json) => {
            fs.writeFileSync(filepath, stringify(json, {space: 2}));
        },
        validCategories: [
            'weapons',
            'archery',
            'shields',
            'armor',
            'materials',
            'food',
            'keyitems'
        ]
    };

    return MapFileUtils;
})();
