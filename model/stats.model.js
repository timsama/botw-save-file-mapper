module.exports = (() => {
    const CONFIG = require('../config.js');
    const changeReader = require('../read-changes.js');
    const changeWriter = require('../apply-changes.js');

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

            const keys = [
                `stats.shrinescompleted=${modelJson.shrinescompleted}`,
                `stats.staminagauge=${modelJson.staminavessels * 200}`,
                `stats.heartcontainers=${modelJson.heartcontainers * 4}`,
                `stats.heartsfilled=${modelJson.heartsfilled * 4}`,
                `stats.rupees=${modelJson.rupees}`
            ];

            return writeChanges(keys);
        }
    };
})();