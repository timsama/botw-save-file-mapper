module.exports = (() => {
    const CONFIG = require('../config.js');
    const changeReader = require('../read-changes.js');
    const changeWriter = require('../batch-apply-changes.js');
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
                'divinebeasts.vahrudania.active',
                'divinebeasts.vahrudania.complete',
                'divinebeasts.vahrudania.found',
                'divinebeasts.vahrudania.map.obtained',
                'divinebeasts.vahrudania.terminalsremaining',
                'divinebeasts.vahrudania.terminal1.on',
                'divinebeasts.vahrudania.terminal2.on',
                'divinebeasts.vahrudania.terminal3.on',
                'divinebeasts.vahrudania.terminal4.on',
                'divinebeasts.vahrudania.terminal5.on',
                'divinebeasts.vahrudania.heartcontainer.available',
                'divinebeasts.vahrudania.heartcontainer.taken'
            ]);

            return {
                active: mapValues['divinebeasts.vahrudania.active'],
                complete: mapValues['divinebeasts.vahrudania.complete'],
                found: mapValues['divinebeasts.vahrudania.found'],
                map: mapValues['divinebeasts.vahrudania.map.obtained'],
                terminalsremaining: mapValues['divinebeasts.vahrudania.terminalsremaining'],
                terminal1: mapValues['divinebeasts.vahrudania.terminal1.on'],
                terminal2: mapValues['divinebeasts.vahrudania.terminal2.on'],
                terminal3: mapValues['divinebeasts.vahrudania.terminal3.on'],
                terminal4: mapValues['divinebeasts.vahrudania.terminal4.on'],
                terminal5: mapValues['divinebeasts.vahrudania.terminal5.on'],
                heartcontaineravailable: mapValues['divinebeasts.vahrudania.heartcontainer.available'],
                heartcontainertaken: mapValues['divinebeasts.vahrudania.heartcontainer.taken']
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
                terminalsremaining = 5;
                modelJson.terminal1 && terminalsremaining--;
                modelJson.terminal2 && terminalsremaining--;
                modelJson.terminal3 && terminalsremaining--;
                modelJson.terminal4 && terminalsremaining--;
                modelJson.terminal5 && terminalsremaining--;
            }

            const keys = [
                `divinebeasts.vahrudania.terminalsremaining=${terminalsremaining}`
            ];

            addKeyBranches(modelJson.active, 'divinebeasts.vahrudania', 'active', 'inactive');
            addKeyBranches(modelJson.complete, 'divinebeasts.vahrudania', 'complete', 'incomplete');
            addKeyBranches(modelJson.found, 'divinebeasts.vahrudania', 'found', 'notfound');
            addKeyBranches(modelJson.map, 'divinebeasts.vahrudania.map', 'obtained', 'notobtained');
            addKeyBranches(modelJson.terminal1, 'divinebeasts.vahrudania.terminal1', 'on', 'off');
            addKeyBranches(modelJson.terminal2, 'divinebeasts.vahrudania.terminal2', 'on', 'off');
            addKeyBranches(modelJson.terminal3, 'divinebeasts.vahrudania.terminal3', 'on', 'off');
            addKeyBranches(modelJson.terminal4, 'divinebeasts.vahrudania.terminal4', 'on', 'off');
            addKeyBranches(modelJson.terminal5, 'divinebeasts.vahrudania.terminal5', 'on', 'off');
            addKeyBranches(modelJson.heartcontaineravailable, 'divinebeasts.vahrudania.heartcontainer', 'available', 'notavailable');
            addKeyBranches(modelJson.heartcontainertaken, 'divinebeasts.vahrudania.heartcontainer', 'taken', 'nottaken');

            return writeChanges(keys);
        }
    };
})();
