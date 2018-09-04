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
        write: (modelJson, saveFile, effectMapPath) => {
            const writeChanges = getChangeWriter(saveFile, effectMapPath);

            const keys = [
                `divinebeasts.vahruta.terminalsremaining=${modelJson.terminalsremaining}`
            ];

            const addKeyIfTrue = (val, key) => {
                if (val === true) {
                    keys.push(key);
                }
            };

            addKeyIfTrue(modelJson.active, 'divinebeasts.vahruta.active');
            addKeyIfTrue(!modelJson.active, 'divinebeasts.vahruta.inactive');

            addKeyIfTrue(modelJson.complete, 'divinebeasts.vahruta.complete');
            addKeyIfTrue(!modelJson.complete, 'divinebeasts.vahruta.incomplete');

            addKeyIfTrue(modelJson.found, 'divinebeasts.vahruta.found');
            addKeyIfTrue(!modelJson.found, 'divinebeasts.vahruta.notfound');

            addKeyIfTrue(modelJson.map, 'divinebeasts.vahruta.map.obtained');
            addKeyIfTrue(!modelJson.map, 'divinebeasts.vahruta.map.notobtained');
            
            addKeyIfTrue(modelJson.terminal1, 'divinebeasts.vahruta.terminal1.on');
            addKeyIfTrue(!modelJson.terminal1, 'divinebeasts.vahruta.terminal1.off');
            
            addKeyIfTrue(modelJson.terminal2, 'divinebeasts.vahruta.terminal2.on');
            addKeyIfTrue(!modelJson.terminal2, 'divinebeasts.vahruta.terminal2.off');
            
            addKeyIfTrue(modelJson.terminal3, 'divinebeasts.vahruta.terminal3.on');
            addKeyIfTrue(!modelJson.terminal3, 'divinebeasts.vahruta.terminal3.off');
            
            addKeyIfTrue(modelJson.terminal4, 'divinebeasts.vahruta.terminal4.on');
            addKeyIfTrue(!modelJson.terminal4, 'divinebeasts.vahruta.terminal4.off');
            
            addKeyIfTrue(modelJson.terminal5, 'divinebeasts.vahruta.terminal5.on');
            addKeyIfTrue(!modelJson.terminal5, 'divinebeasts.vahruta.terminal5.off');

            addKeyIfTrue(modelJson.heartcontaineravailable, 'divinebeasts.vahruta.heartcontainer.available');
            addKeyIfTrue(!modelJson.heartcontaineravailable, 'divinebeasts.vahruta.heartcontainer.notavailable');

            addKeyIfTrue(modelJson.heartcontainertaken, 'divinebeasts.vahruta.heartcontainer.taken');
            addKeyIfTrue(!modelJson.heartcontainertaken, 'divinebeasts.vahruta.heartcontainer.nottaken');

            return writeChanges(keys);
        }
    };
})();
