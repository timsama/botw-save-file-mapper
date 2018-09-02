module.exports = (() => {
    const CONFIG = require('../config.js');
    const changeReader = require('../read-changes.js');
    const changeWriter = require('../batch-apply-changes.js');
    const defaultEffectMap = `${CONFIG.exportpath}effectmap.json`;

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
                `towers.${name}.active`,
                `towers.${name}.found`
            ]);

            return {
                active: mapValues[`towers.${name}.active`],
                found: mapValues[`towers.${name}.found`]
            };
        },
        write: (name, modelJson, saveFile, effectMapPath) => {
            const writeChanges = getChangeWriter(saveFile, effectMapPath);

            const keys = [];

            const addKeyIfTrue = (val, key) => {
                if (val === true) {
                    keys.push(key);
                }
            };

            addKeyIfTrue(modelJson.active, `towers.${name}.active`);
            addKeyIfTrue(!modelJson.active, `towers.${name}.inactive`);

            addKeyIfTrue(modelJson.found, `towers.${name}.found`);
            addKeyIfTrue(!modelJson.found, `towers.${name}.notfound`);

            return writeChanges(keys);
        }
    };
})();
