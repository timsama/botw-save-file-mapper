module.exports = (() => {
    const CONFIG = require('../config.js');
    const changeReader = require('../read-changes.js');
    const changeWriter = require('../apply-changes.js');

    const defaultEffectMap = `${CONFIG.exportpath}effectmap.json`;

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
                'fairyfountains.cotera.unlocked',
                'fairyfountains.kaysa.unlocked',
                'fairyfountains.malanya.unlocked',
                'fairyfountains.mija.unlocked',
                'fairyfountains.tera.unlocked',
                'fairyfountains.powerlevel'
            ]);

            return {
                cotera: {
                    unlocked: mapValues['fairyfountains.cotera.unlocked']
                },
                kaysa: {
                    unlocked: mapValues['fairyfountains.kaysa.unlocked']
                },
                malanya: {
                    unlocked: mapValues['fairyfountains.malanya.unlocked']
                },
                mija: {
                    unlocked: mapValues['fairyfountains.mija.unlocked']
                },
                tera: {
                    unlocked: mapValues['fairyfountains.tera.unlocked']
                },
                powerlevel: mapValues['fairyfountains.powerlevel']
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            const writeChanges = getChangeWriter(saveFile, effectMapPath);

            const keys = [
                `fairyfountains.powerlevel=${modelJson.powerlevel}`
            ];

            const addKeyIfTrue = (val, key) => {
                if (val === true) {
                    keys.push(key);
                }
            };

            addKeyIfTrue(modelJson.cotera.unlocked, 'fairyfountains.cotera.unlocked');
            addKeyIfTrue(!modelJson.cotera.unlocked, 'fairyfountains.cotera.locked');

            addKeyIfTrue(modelJson.kaysa.unlocked, 'fairyfountains.kaysa.unlocked');
            addKeyIfTrue(!modelJson.kaysa.unlocked, 'fairyfountains.kaysa.locked');

            addKeyIfTrue(modelJson.malanya.unlocked, 'fairyfountains.malanya.unlocked');
            addKeyIfTrue(!modelJson.malanya.unlocked, 'fairyfountains.malanya.locked');

            addKeyIfTrue(modelJson.mija.unlocked, 'fairyfountains.mija.unlocked');
            addKeyIfTrue(!modelJson.mija.unlocked, 'fairyfountains.mija.locked');

            addKeyIfTrue(modelJson.tera.unlocked, 'fairyfountains.tera.unlocked');
            addKeyIfTrue(!modelJson.tera.unlocked, 'fairyfountains.tera.locked');

            return writeChanges(keys);
        }
    };
})();