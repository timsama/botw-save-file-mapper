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
                'divinebeasts.vahrudania.active',
                'divinebeasts.vahrudania.complete',
                'divinebeasts.vahrudania.found',
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
            const writeChanges = getChangeWriter(saveFile, effectMapPath);

            const keys = [];

            const addKeyIfTrue = (val, key) => {
                if (val === true) {
                    keys.push(key);
                }
            };

            addKeyIfTrue(modelJson.active, 'divinebeasts.vahrudania.active');
            addKeyIfTrue(!modelJson.active, 'divinebeasts.vahrudania.inactive');

            addKeyIfTrue(modelJson.complete, 'divinebeasts.vahrudania.complete');
            addKeyIfTrue(!modelJson.complete, 'divinebeasts.vahrudania.incomplete');

            addKeyIfTrue(modelJson.found, 'divinebeasts.vahrudania.found');
            addKeyIfTrue(!modelJson.found, 'divinebeasts.vahrudania.notfound');

            let terminalsRemaining = 5;
            modelJson.terminal1 && terminalsRemaining--;
            modelJson.terminal2 && terminalsRemaining--;
            modelJson.terminal3 && terminalsRemaining--;
            modelJson.terminal4 && terminalsRemaining--;
            modelJson.terminal5 && terminalsRemaining--;
            keys.push(`divinebeasts.vahrudania.terminalsremaining=${terminalsRemaining}`);
            
            addKeyIfTrue(modelJson.terminal1, 'divinebeasts.vahrudania.terminal1.on');
            addKeyIfTrue(!modelJson.terminal1, 'divinebeasts.vahrudania.terminal1.off');
            
            addKeyIfTrue(modelJson.terminal2, 'divinebeasts.vahrudania.terminal2.on');
            addKeyIfTrue(!modelJson.terminal2, 'divinebeasts.vahrudania.terminal2.off');
            
            addKeyIfTrue(modelJson.terminal3, 'divinebeasts.vahrudania.terminal3.on');
            addKeyIfTrue(!modelJson.terminal3, 'divinebeasts.vahrudania.terminal3.off');
            
            addKeyIfTrue(modelJson.terminal4, 'divinebeasts.vahrudania.terminal4.on');
            addKeyIfTrue(!modelJson.terminal4, 'divinebeasts.vahrudania.terminal4.off');
            
            addKeyIfTrue(modelJson.terminal5, 'divinebeasts.vahrudania.terminal5.on');
            addKeyIfTrue(!modelJson.terminal5, 'divinebeasts.vahrudania.terminal5.off');

            addKeyIfTrue(modelJson.heartcontaineravailable, 'divinebeasts.vahrudania.heartcontainer.available');
            addKeyIfTrue(!modelJson.heartcontaineravailable, 'divinebeasts.vahrudania.heartcontainer.notavailable');

            addKeyIfTrue(modelJson.heartcontainertaken, 'divinebeasts.vahrudania.heartcontainer.taken');
            addKeyIfTrue(!modelJson.heartcontainertaken, 'divinebeasts.vahrudania.heartcontainer.nottaken');

            return writeChanges(keys);
        }
    };
})();
