module.exports = (() => {
    const CONFIG = require('../config.js');
    const changeReader = require('../read-changes.js');
    const changeWriter = require('../batch-apply-changes.js');
    const defaultEffectMap = `${CONFIG.mapfilepath}effectmap.json`;

    const Tower = require('./tower.model.js');

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
        read: (saveFile, effectMapPath) => {
            const readChanges = getChangeReader(saveFile, effectMapPath);
            const allunearthed = readChanges(['towers.all.unearthed'])['towers.all.unearthed'];

            return {
                all: {
                    unearthed: allunearthed
                },
                akkala: Tower.read('akkala', saveFile, effectMapPath),
                central: Tower.read('central', saveFile, effectMapPath),
                duelingpeaks: Tower.read('duelingpeaks', saveFile, effectMapPath),
                eldin: Tower.read('eldin', saveFile, effectMapPath),
                faron: Tower.read('faron', saveFile, effectMapPath),
                gerudo: Tower.read('gerudo', saveFile, effectMapPath),
                greatplateau: Tower.read('greatplateau', saveFile, effectMapPath),
                hateno: Tower.read('hateno', saveFile, effectMapPath),
                hebra: Tower.read('hebra', saveFile, effectMapPath),
                lake: Tower.read('lake', saveFile, effectMapPath),
                lanayru: Tower.read('lanayru', saveFile, effectMapPath),
                ridgeland: Tower.read('ridgeland', saveFile, effectMapPath),
                tabantha: Tower.read('tabantha', saveFile, effectMapPath),
                wasteland: Tower.read('wasteland', saveFile, effectMapPath),
                woodland: Tower.read('woodland', saveFile, effectMapPath)
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
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

            modelJson.all && addKeyBranches(modelJson.all.unearthed, 'towers.all', 'unearthed', 'buried');

            return writeChanges(keys)
                .then(() => Tower.write('akkala', modelJson.akkala, saveFile, effectMapPath))
                .then(() => Tower.write('central', modelJson.central, saveFile, effectMapPath))
                .then(() => Tower.write('duelingpeaks', modelJson.duelingpeaks, saveFile, effectMapPath))
                .then(() => Tower.write('eldin', modelJson.eldin, saveFile, effectMapPath))
                .then(() => Tower.write('faron', modelJson.faron, saveFile, effectMapPath))
                .then(() => Tower.write('gerudo', modelJson.gerudo, saveFile, effectMapPath))
                .then(() => Tower.write('greatplateau', modelJson.greatplateau, saveFile, effectMapPath))
                .then(() => Tower.write('hateno', modelJson.hateno, saveFile, effectMapPath))
                .then(() => Tower.write('hebra', modelJson.hebra, saveFile, effectMapPath))
                .then(() => Tower.write('lake', modelJson.lake, saveFile, effectMapPath))
                .then(() => Tower.write('lanayru', modelJson.lanayru, saveFile, effectMapPath))
                .then(() => Tower.write('ridgeland', modelJson.ridgeland, saveFile, effectMapPath))
                .then(() => Tower.write('tabantha', modelJson.tabantha, saveFile, effectMapPath))
                .then(() => Tower.write('wasteland', modelJson.wasteland, saveFile, effectMapPath))
                .then(() => Tower.write('woodland', modelJson.woodland, saveFile, effectMapPath));
        }
    };
})();