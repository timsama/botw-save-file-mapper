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
                'divinebeasts.vahnaboris.active',
                'divinebeasts.vahnaboris.complete',
                'divinebeasts.vahnaboris.found',
                'divinebeasts.vahnaboris.map.obtained',
                'divinebeasts.vahnaboris.terminalsremaining',
                'divinebeasts.vahnaboris.terminal1.on',
                'divinebeasts.vahnaboris.terminal2.on',
                'divinebeasts.vahnaboris.terminal3.on',
                'divinebeasts.vahnaboris.terminal4.on',
                'divinebeasts.vahnaboris.terminal5.on',
                'divinebeasts.vahnaboris.heartcontainer.available',
                'divinebeasts.vahnaboris.heartcontainer.taken'
            ]);

            return {
                active: mapValues['divinebeasts.vahnaboris.active'],
                complete: mapValues['divinebeasts.vahnaboris.complete'],
                found: mapValues['divinebeasts.vahnaboris.found'],
                map: mapValues['divinebeasts.vahnaboris.map.obtained'],
                terminalsremaining: mapValues['divinebeasts.vahnaboris.terminalsremaining'],
                terminal1: mapValues['divinebeasts.vahnaboris.terminal1.on'],
                terminal2: mapValues['divinebeasts.vahnaboris.terminal2.on'],
                terminal3: mapValues['divinebeasts.vahnaboris.terminal3.on'],
                terminal4: mapValues['divinebeasts.vahnaboris.terminal4.on'],
                terminal5: mapValues['divinebeasts.vahnaboris.terminal5.on'],
                heartcontaineravailable: mapValues['divinebeasts.vahnaboris.heartcontainer.available'],
                heartcontainertaken: mapValues['divinebeasts.vahnaboris.heartcontainer.taken']
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
                `divinebeasts.vahnaboris.terminalsremaining=${terminalsremaining}`
            ];

            addKeyBranches(modelJson.active, 'divinebeasts.vahnaboris', 'active', 'inactive');
            addKeyBranches(modelJson.complete, 'divinebeasts.vahnaboris', 'complete', 'incomplete');
            addKeyBranches(modelJson.found, 'divinebeasts.vahnaboris', 'found', 'notfound');
            addKeyBranches(modelJson.map, 'divinebeasts.vahnaboris.map', 'obtained', 'notobtained');
            addKeyBranches(modelJson.terminal1, 'divinebeasts.vahnaboris.terminal1', 'on', 'off');
            addKeyBranches(modelJson.terminal2, 'divinebeasts.vahnaboris.terminal2', 'on', 'off');
            addKeyBranches(modelJson.terminal3, 'divinebeasts.vahnaboris.terminal3', 'on', 'off');
            addKeyBranches(modelJson.terminal4, 'divinebeasts.vahnaboris.terminal4', 'on', 'off');
            addKeyBranches(modelJson.terminal5, 'divinebeasts.vahnaboris.terminal5', 'on', 'off');
            addKeyBranches(modelJson.heartcontaineravailable, 'divinebeasts.vahnaboris.heartcontainer', 'available', 'notavailable');
            addKeyBranches(modelJson.heartcontainertaken, 'divinebeasts.vahnaboris.heartcontainer', 'taken', 'nottaken');

            return writeChanges(keys);
        }
    };
})();
