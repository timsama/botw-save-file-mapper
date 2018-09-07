module.exports = (() => {
    const CONFIG = require('../config.json');
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
        read: (saveFile, effectMapPath) => {
            const readChanges = getChangeReader(saveFile, effectMapPath);

            const mapValues = readChanges([
                'divinebeasts.finaltrial.complete',
                'divinebeasts.finaltrial.map.obtained',
                'divinebeasts.finaltrial.terminalsremaining',
                'divinebeasts.finaltrial.terminal1.on',
                'divinebeasts.finaltrial.terminal2.on',
                'divinebeasts.finaltrial.terminal3.on',
                'divinebeasts.finaltrial.terminal4.on'
            ]);

            return {
                complete: mapValues['divinebeasts.finaltrial.complete'],
                map: mapValues['divinebeasts.finaltrial.map.obtained'],
                terminalsremaining: mapValues['divinebeasts.finaltrial.terminalsremaining'],
                terminal1: mapValues['divinebeasts.finaltrial.terminal1.on'],
                terminal2: mapValues['divinebeasts.finaltrial.terminal2.on'],
                terminal3: mapValues['divinebeasts.finaltrial.terminal3.on'],
                terminal4: mapValues['divinebeasts.finaltrial.terminal4.on']
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const writeChanges = getChangeWriter(saveFile, effectMapPath);

            const addKeyBranches = (val, baseKey, extensionTrue, extensionFalse) => {
                if (val === true) {
                    keys.push(`${baseKey}.${extensionTrue}`);
                }
                if (val === false) {
                    keys.push(`${baseKey}.${extensionFalse}`);
                }
            };


            let terminalsremaining = modelJson.terminalsremaining;

            if (modelJson.terminalsremaining === undefined) {
                terminalsremaining = 4;
                modelJson.terminal1 && terminalsremaining--;
                modelJson.terminal2 && terminalsremaining--;
                modelJson.terminal3 && terminalsremaining--;
                modelJson.terminal4 && terminalsremaining--;
            }

            const keys = [
                `divinebeasts.finaltrial.terminalsremaining=${terminalsremaining}`
            ];

            addKeyBranches(modelJson.complete, 'divinebeasts.finaltrial', 'complete', 'incomplete');
            addKeyBranches(modelJson.map, 'divinebeasts.finaltrial.map', 'obtained', 'notobtained');
            addKeyBranches(modelJson.terminal1, 'divinebeasts.finaltrial.terminal1', 'on', 'off');
            addKeyBranches(modelJson.terminal2, 'divinebeasts.finaltrial.terminal2', 'on', 'off');
            addKeyBranches(modelJson.terminal3, 'divinebeasts.finaltrial.terminal3', 'on', 'off');
            addKeyBranches(modelJson.terminal4, 'divinebeasts.finaltrial.terminal4', 'on', 'off');






            return writeChanges(keys);
        }
    };
})();
