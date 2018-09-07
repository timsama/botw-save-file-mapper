module.exports = (() => {
    const CONFIG = require('../config.js');
    const changeReader = require('../lib/read-changes.js');
    const changeWriter = require('../lib/batch-apply-changes.js');
    const defaultEffectMap = `${CONFIG.mapfilepath}effectmap.json`;

    const getChangeReader = (saveFile, effectMapPath) => {
        return (keys, withLogging) => {
            return changeReader(saveFile)(effectMapPath || defaultEffectMap, keys, withLogging);
        };
    };
    const getChangeWriter = (saveFile, effectMapPath) => {
        return (keys, skipSoftDependencies, withLogging) => {
            return changeWriter(saveFile)(effectMapPath || defaultEffectMap, keys, skipSoftDependencies, withLogging);
        };
    };

    return {
        read: (name, saveFile, effectMapPath) => {
            const readChanges = getChangeReader(saveFile, effectMapPath);

            const mapValues = readChanges([
                `ancienttechlabs.${name}.active`,
                `ancienttechlabs.${name}.found`
            ]);

            return {
                active: mapValues[`ancienttechlabs.${name}.active`],
                found: mapValues[`ancienttechlabs.${name}.found`]
            };
        },
        write: (name, modelJson, saveFile, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const writeChanges = getChangeWriter(saveFile, effectMapPath);

            const keys = [];

            const addKeyBranches = (val, baseKey, extensionTrue, extensionFalse) => {
                if (val === true) {
                    keys.push(`${baseKey}.${extensionTrue}`);
                }
                if (val === false) {
                    keys.push(`${baseKey}.${extensionFalse}`);
                }
            };

            addKeyBranches(modelJson.active, `ancienttechlabs.${name}`, 'active', 'inactive');
            addKeyBranches(modelJson.found, `ancienttechlabs.${name}`, 'found', 'notfound');

            return writeChanges(keys);
        }
    };
})();
