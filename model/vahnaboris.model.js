module.exports = (() => {
    const CONFIG = require('../config.js');
    const changeReader = require('../read-changes.js');
    const changeWriter = require('../batch-apply-changes.js');
    const defaultEffectMap = `${CONFIG.exportpath}effectmap.json`;

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

            const keys = [
                `divinebeasts.vahnaboris.terminalsremaining=${modelJson.terminalsremaining}`
            ];

            const addKeyIfTrue = (val, key) => {
                if (val === true) {
                    keys.push(key);
                }
            };

            const addKeyIfFalse = (val, key) => {
                if (val === false) {
                    keys.push(key);
                }
            };

            addKeyIfTrue(modelJson.active, 'divinebeasts.vahnaboris.active');
            addKeyIfFalse(modelJson.active, 'divinebeasts.vahnaboris.inactive');

            addKeyIfTrue(modelJson.complete, 'divinebeasts.vahnaboris.complete');
            addKeyIfFalse(modelJson.complete, 'divinebeasts.vahnaboris.incomplete');

            addKeyIfTrue(modelJson.found, 'divinebeasts.vahnaboris.found');
            addKeyIfFalse(modelJson.found, 'divinebeasts.vahnaboris.notfound');

            addKeyIfTrue(modelJson.map, 'divinebeasts.vahnaboris.map.obtained');
            addKeyIfFalse(modelJson.map, 'divinebeasts.vahnaboris.map.notobtained');
            
            addKeyIfTrue(modelJson.terminal1, 'divinebeasts.vahnaboris.terminal1.on');
            addKeyIfFalse(modelJson.terminal1, 'divinebeasts.vahnaboris.terminal1.off');
            
            addKeyIfTrue(modelJson.terminal2, 'divinebeasts.vahnaboris.terminal2.on');
            addKeyIfFalse(modelJson.terminal2, 'divinebeasts.vahnaboris.terminal2.off');
            
            addKeyIfTrue(modelJson.terminal3, 'divinebeasts.vahnaboris.terminal3.on');
            addKeyIfFalse(modelJson.terminal3, 'divinebeasts.vahnaboris.terminal3.off');
            
            addKeyIfTrue(modelJson.terminal4, 'divinebeasts.vahnaboris.terminal4.on');
            addKeyIfFalse(modelJson.terminal4, 'divinebeasts.vahnaboris.terminal4.off');
            
            addKeyIfTrue(modelJson.terminal5, 'divinebeasts.vahnaboris.terminal5.on');
            addKeyIfFalse(modelJson.terminal5, 'divinebeasts.vahnaboris.terminal5.off');

            addKeyIfTrue(modelJson.heartcontaineravailable, 'divinebeasts.vahnaboris.heartcontainer.available');
            addKeyIfFalse(modelJson.heartcontaineravailable, 'divinebeasts.vahnaboris.heartcontainer.notavailable');

            addKeyIfTrue(modelJson.heartcontainertaken, 'divinebeasts.vahnaboris.heartcontainer.taken');
            addKeyIfFalse(modelJson.heartcontainertaken, 'divinebeasts.vahnaboris.heartcontainer.nottaken');

            return writeChanges(keys);
        }
    };
})();
