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
                `ancienttechlabs.${name}.active`,
                `ancienttechlabs.${name}.found`
            ]);

            return {
                active: mapValues[`ancienttechlabs.${name}.active`],
                found: mapValues[`ancienttechlabs.${name}.found`]
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

            addKeyIfTrue(modelJson.active, `ancienttechlabs.${name}.active`);
            addKeyIfTrue(!modelJson.active, `ancienttechlabs.${name}.inactive`);

            addKeyIfTrue(modelJson.found, `ancienttechlabs.${name}.found`);
            addKeyIfTrue(!modelJson.found, `ancienttechlabs.${name}.notfound`);

            return writeChanges(keys);
        }
    };
})();
