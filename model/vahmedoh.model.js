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
                'divinebeasts.vahmedoh.active',
                'divinebeasts.vahmedoh.complete',
                'divinebeasts.vahmedoh.found',
                'divinebeasts.vahmedoh.map.obtained',
                'divinebeasts.vahmedoh.terminalsremaining',
                'divinebeasts.vahmedoh.terminal1.on',
                'divinebeasts.vahmedoh.terminal2.on',
                'divinebeasts.vahmedoh.terminal3.on',
                'divinebeasts.vahmedoh.terminal4.on',
                'divinebeasts.vahmedoh.terminal5.on',
                'divinebeasts.vahmedoh.heartcontainer.available',
                'divinebeasts.vahmedoh.heartcontainer.taken'
            ]);

            return {
                active: mapValues['divinebeasts.vahmedoh.active'],
                complete: mapValues['divinebeasts.vahmedoh.complete'],
                found: mapValues['divinebeasts.vahmedoh.found'],
                map: mapValues['divinebeasts.vahmedoh.map.obtained'],
                terminalsremaining: mapValues['divinebeasts.vahmedoh.terminalsremaining'],
                terminal1: mapValues['divinebeasts.vahmedoh.terminal1.on'],
                terminal2: mapValues['divinebeasts.vahmedoh.terminal2.on'],
                terminal3: mapValues['divinebeasts.vahmedoh.terminal3.on'],
                terminal4: mapValues['divinebeasts.vahmedoh.terminal4.on'],
                terminal5: mapValues['divinebeasts.vahmedoh.terminal5.on'],
                heartcontaineravailable: mapValues['divinebeasts.vahmedoh.heartcontainer.available'],
                heartcontainertaken: mapValues['divinebeasts.vahmedoh.heartcontainer.taken']
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
                `divinebeasts.vahmedoh.terminalsremaining=${terminalsremaining}`
            ];

            addKeyBranches(modelJson.active, 'divinebeasts.vahmedoh', 'active', 'inactive');
            addKeyBranches(modelJson.complete, 'divinebeasts.vahmedoh', 'complete', 'incomplete');
            addKeyBranches(modelJson.found, 'divinebeasts.vahmedoh', 'found', 'notfound');
            addKeyBranches(modelJson.map, 'divinebeasts.vahmedoh.map', 'obtained', 'notobtained');
            addKeyBranches(modelJson.terminal1, 'divinebeasts.vahmedoh.terminal1', 'on', 'off');
            addKeyBranches(modelJson.terminal2, 'divinebeasts.vahmedoh.terminal2', 'on', 'off');
            addKeyBranches(modelJson.terminal3, 'divinebeasts.vahmedoh.terminal3', 'on', 'off');
            addKeyBranches(modelJson.terminal4, 'divinebeasts.vahmedoh.terminal4', 'on', 'off');
            addKeyBranches(modelJson.terminal5, 'divinebeasts.vahmedoh.terminal5', 'on', 'off');
            addKeyBranches(modelJson.heartcontaineravailable, 'divinebeasts.vahmedoh.heartcontainer', 'available', 'notavailable');
            addKeyBranches(modelJson.heartcontainertaken, 'divinebeasts.vahmedoh.heartcontainer', 'taken', 'nottaken');

            return writeChanges(keys);
        }
    };
})();
