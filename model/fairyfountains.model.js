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
            if (!modelJson) {
                return Promise.resolve();
            }
            const writeChanges = getChangeWriter(saveFile, effectMapPath);

            const keys = [
                `fairyfountains.powerlevel=${modelJson.powerlevel}`
            ];

            const addKeyBranches = (val, baseKey, extensionTrue, extensionFalse) => {
                if (val === true) {
                    keys.push(`${baseKey}.${extensionTrue}`);
                }
                if (val === false) {
                    keys.push(`${baseKey}.${extensionFalse}`);
                }
            };

            !!modelJson.cotera && addKeyBranches(modelJson.cotera.unlocked, 'fairyfountains.cotera', 'unlocked', 'locked');
            !!modelJson.kaysa && addKeyBranches(modelJson.kaysa.unlocked, 'fairyfountains.kaysa', 'unlocked', 'locked');
            !!modelJson.malanya && addKeyBranches(modelJson.malanya.unlocked, 'fairyfountains.malanya', 'unlocked', 'locked');
            !!modelJson.mija && addKeyBranches(modelJson.mija.unlocked, 'fairyfountains.mija', 'unlocked', 'locked');
            !!modelJson.tera && addKeyBranches(modelJson.tera.unlocked, 'fairyfountains.tera', 'unlocked', 'locked');

            return writeChanges(keys);
        }
    };
})();