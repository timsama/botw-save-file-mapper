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
            const writeChanges = getChangeWriter(saveFile, effectMapPath);

            const keys = [
                `divinebeasts.vahmedoh.terminalsremaining=${modelJson.terminalsremaining}`
            ];

            const addKeyIfTrue = (val, key) => {
                if (val === true) {
                    keys.push(key);
                }
            };

            addKeyIfTrue(modelJson.active, 'divinebeasts.vahmedoh.active');
            addKeyIfTrue(!modelJson.active, 'divinebeasts.vahmedoh.inactive');

            addKeyIfTrue(modelJson.complete, 'divinebeasts.vahmedoh.complete');
            addKeyIfTrue(!modelJson.complete, 'divinebeasts.vahmedoh.incomplete');

            addKeyIfTrue(modelJson.found, 'divinebeasts.vahmedoh.found');
            addKeyIfTrue(!modelJson.found, 'divinebeasts.vahmedoh.notfound');

            addKeyIfTrue(modelJson.map, 'divinebeasts.vahmedoh.map.obtained');
            addKeyIfTrue(!modelJson.map, 'divinebeasts.vahmedoh.map.notobtained');
            
            addKeyIfTrue(modelJson.terminal1, 'divinebeasts.vahmedoh.terminal1.on');
            addKeyIfTrue(!modelJson.terminal1, 'divinebeasts.vahmedoh.terminal1.off');
            
            addKeyIfTrue(modelJson.terminal2, 'divinebeasts.vahmedoh.terminal2.on');
            addKeyIfTrue(!modelJson.terminal2, 'divinebeasts.vahmedoh.terminal2.off');
            
            addKeyIfTrue(modelJson.terminal3, 'divinebeasts.vahmedoh.terminal3.on');
            addKeyIfTrue(!modelJson.terminal3, 'divinebeasts.vahmedoh.terminal3.off');
            
            addKeyIfTrue(modelJson.terminal4, 'divinebeasts.vahmedoh.terminal4.on');
            addKeyIfTrue(!modelJson.terminal4, 'divinebeasts.vahmedoh.terminal4.off');
            
            addKeyIfTrue(modelJson.terminal5, 'divinebeasts.vahmedoh.terminal5.on');
            addKeyIfTrue(!modelJson.terminal5, 'divinebeasts.vahmedoh.terminal5.off');

            addKeyIfTrue(modelJson.heartcontaineravailable, 'divinebeasts.vahmedoh.heartcontainer.available');
            addKeyIfTrue(!modelJson.heartcontaineravailable, 'divinebeasts.vahmedoh.heartcontainer.notavailable');

            addKeyIfTrue(modelJson.heartcontainertaken, 'divinebeasts.vahmedoh.heartcontainer.taken');
            addKeyIfTrue(!modelJson.heartcontainertaken, 'divinebeasts.vahmedoh.heartcontainer.nottaken');

            return writeChanges(keys);
        }
    };
})();
