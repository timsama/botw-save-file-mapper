module.exports = (() => {
    const CONFIG = require('../config.json');
    const changeWriter = require('../lib/apply-changes.js');
    const defaultEffectMap = `${CONFIG.mapfilepath}effectmap.json`;

    const getChangeWriter = (saveFile, effectMapPath) => {
        return (keys, options) => {
            return changeWriter(saveFile, true)(effectMapPath || defaultEffectMap, keys, options);
        };
    };

    return {
        read: (saveFile, effectMapPath) => {
            return {
                keys: []
            };
        },
        write: (modelJson, saveFile, options, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const writeChanges = getChangeWriter(saveFile, effectMapPath);

            const keys = [];

            const originalOptions = options || {};
            const modifiedOptions = {};
            
            Object.keys(originalOptions).forEach(key => {
                modifiedOptions[key] = originalOptions[key];
            });

            modifiedOptions.skipSoftDependencies = true;

            return writeChanges(modelJson.keys, modifiedOptions);
        }
    };
})();