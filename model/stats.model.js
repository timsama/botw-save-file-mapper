module.exports = (() => {
    const CONFIG = require('../config.json');
    const changeReader = require('../lib/read-changes.js');
    const changeWriter = require('../lib/apply-changes.js');

    const defaultEffectMap = `${CONFIG.mapfilepath}effectmap.json`;

    const getChangeReader = (saveFile, effectMapPath) => {
        return (keys, withLogging) => {
            return changeReader(saveFile)(effectMapPath || defaultEffectMap, keys, withLogging);
        };
    };
    const getChangeWriter = (saveFile, effectMapPath) => {
        return (keys, skipSoftDependencies, withLogging) => {
            return changeWriter(saveFile, true)(effectMapPath || defaultEffectMap, keys, skipSoftDependencies, withLogging);
        };
    };

    return {
        read: (saveFile, effectMapPath) => {
            const readChanges = getChangeReader(saveFile, effectMapPath);

            const mapValues = readChanges([
                'stats.shrinescompleted',
                'stats.staminagauge',
                'stats.heartcontainers',
                'stats.heartsfilled',
                'stats.rupees',
            ]);

            return {
                shrinescompleted: mapValues['stats.shrinescompleted'],
                staminavessels: mapValues['stats.staminagauge'] / 200,
                heartcontainers: mapValues['stats.heartcontainers'] / 4.0,
                heartsfilled: mapValues['stats.heartsfilled'] / 4.0,
                rupees: mapValues['stats.rupees']
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const writeChanges = getChangeWriter(saveFile, effectMapPath);
            
            const keys = [];

            const addKeyIfDefined = (val, key) => {
                if (val !== undefined) {
                    keys.push(key);
                }
            };

            addKeyIfDefined(modelJson.shrinescompleted, `stats.shrinescompleted=${modelJson.shrinescompleted}`);
            addKeyIfDefined(modelJson.staminavessels, `stats.staminagauge=${modelJson.staminavessels * 200}`);
            addKeyIfDefined(modelJson.heartcontainers, `stats.heartcontainers=${modelJson.heartcontainers * 4}`);
            addKeyIfDefined(modelJson.heartsfilled, `stats.heartsfilled=${modelJson.heartsfilled * 4}`);
            addKeyIfDefined(modelJson.rupees, `stats.rupees=${modelJson.rupees}`);

            return writeChanges(keys);
        }
    };
})();