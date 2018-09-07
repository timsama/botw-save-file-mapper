module.exports = (() => {
    const CONFIG = require('../config.json');
    const changeReader = require('../lib/read-changes.js');
    const changeWriter = require('../lib/batch-apply-changes.js');
    const defaultEffectMap = `${CONFIG.mapfilepath}effectmap.json`;

    const Tower = require('./tower.model.js');

    const getChangeReader = (saveFile, effectMapPath) => {
        return (keys, withLogging) => {
            return changeReader(saveFile)(effectMapPath || defaultEffectMap, keys, withLogging);
        };
    };
    const getChangeWriter = (saveFile, effectMapPath) => {
        return (keys, options) => {
            return changeWriter(saveFile)(effectMapPath || defaultEffectMap, keys, options);
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
        write: (modelJson, saveFile, options, effectMapPath) => {
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
                .then(() => Tower.write('akkala', modelJson.akkala, saveFile, options, effectMapPath))
                .then(() => Tower.write('central', modelJson.central, saveFile, options, effectMapPath))
                .then(() => Tower.write('duelingpeaks', modelJson.duelingpeaks, saveFile, options, effectMapPath))
                .then(() => Tower.write('eldin', modelJson.eldin, saveFile, options, effectMapPath))
                .then(() => Tower.write('faron', modelJson.faron, saveFile, options, effectMapPath))
                .then(() => Tower.write('gerudo', modelJson.gerudo, saveFile, options, effectMapPath))
                .then(() => Tower.write('greatplateau', modelJson.greatplateau, saveFile, options, effectMapPath))
                .then(() => Tower.write('hateno', modelJson.hateno, saveFile, options, effectMapPath))
                .then(() => Tower.write('hebra', modelJson.hebra, saveFile, options, effectMapPath))
                .then(() => Tower.write('lake', modelJson.lake, saveFile, options, effectMapPath))
                .then(() => Tower.write('lanayru', modelJson.lanayru, saveFile, options, effectMapPath))
                .then(() => Tower.write('ridgeland', modelJson.ridgeland, saveFile, options, effectMapPath))
                .then(() => Tower.write('tabantha', modelJson.tabantha, saveFile, options, effectMapPath))
                .then(() => Tower.write('wasteland', modelJson.wasteland, saveFile, options, effectMapPath))
                .then(() => Tower.write('woodland', modelJson.woodland, saveFile, options, effectMapPath));
        }
    };
})();