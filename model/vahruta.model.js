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
        return (keys, options) => {
            return changeWriter(saveFile)(effectMapPath || defaultEffectMap, keys, options);
        };
    };

    return {
        read: (saveFile, effectMapPath) => {
            const readChanges = getChangeReader(saveFile, effectMapPath);

            const mapValues = readChanges([
                'divinebeasts.vahruta.active',
                'divinebeasts.vahruta.complete',
                'divinebeasts.vahruta.found',
                'divinebeasts.vahruta.map.obtained',
                'divinebeasts.vahruta.terminalsremaining',
                'divinebeasts.vahruta.terminal1.on',
                'divinebeasts.vahruta.terminal2.on',
                'divinebeasts.vahruta.terminal3.on',
                'divinebeasts.vahruta.terminal4.on',
                'divinebeasts.vahruta.terminal5.on',
                'divinebeasts.vahruta.heartcontainer.available',
                'divinebeasts.vahruta.heartcontainer.taken'
            ]);

            return {
                active: mapValues['divinebeasts.vahruta.active'],
                complete: mapValues['divinebeasts.vahruta.complete'],
                found: mapValues['divinebeasts.vahruta.found'],
                map: mapValues['divinebeasts.vahruta.map.obtained'],
                terminalsremaining: mapValues['divinebeasts.vahruta.terminalsremaining'],
                terminal1: mapValues['divinebeasts.vahruta.terminal1.on'],
                terminal2: mapValues['divinebeasts.vahruta.terminal2.on'],
                terminal3: mapValues['divinebeasts.vahruta.terminal3.on'],
                terminal4: mapValues['divinebeasts.vahruta.terminal4.on'],
                terminal5: mapValues['divinebeasts.vahruta.terminal5.on'],
                heartcontaineravailable: mapValues['divinebeasts.vahruta.heartcontainer.available'],
                heartcontainertaken: mapValues['divinebeasts.vahruta.heartcontainer.taken']
            };
        },
        write: (modelJson, saveFile, options, effectMapPath) => {
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
                `divinebeasts.vahruta.terminalsremaining=${terminalsremaining}`
            ];

            addKeyBranches(modelJson.active, 'divinebeasts.vahruta', 'active', 'inactive');
            addKeyBranches(modelJson.complete, 'divinebeasts.vahruta', 'complete', 'incomplete');
            addKeyBranches(modelJson.found, 'divinebeasts.vahruta', 'found', 'notfound');
            addKeyBranches(modelJson.map, 'divinebeasts.vahruta.map', 'obtained', 'notobtained');
            addKeyBranches(modelJson.terminal1, 'divinebeasts.vahruta.terminal1', 'on', 'off');
            addKeyBranches(modelJson.terminal2, 'divinebeasts.vahruta.terminal2', 'on', 'off');
            addKeyBranches(modelJson.terminal3, 'divinebeasts.vahruta.terminal3', 'on', 'off');
            addKeyBranches(modelJson.terminal4, 'divinebeasts.vahruta.terminal4', 'on', 'off');
            addKeyBranches(modelJson.terminal5, 'divinebeasts.vahruta.terminal5', 'on', 'off');
            addKeyBranches(modelJson.heartcontaineravailable, 'divinebeasts.vahruta.heartcontainer', 'available', 'notavailable');
            addKeyBranches(modelJson.heartcontainertaken, 'divinebeasts.vahruta.heartcontainer', 'taken', 'nottaken');

            return writeChanges(keys, options);
        }
    };
})();
