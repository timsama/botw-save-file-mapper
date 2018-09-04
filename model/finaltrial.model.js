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
            const writeChanges = getChangeWriter(saveFile, effectMapPath);

            const keys = [
                `divinebeasts.finaltrial.terminalsremaining=${modelJson.terminalsremaining}`
            ];

            const addKeyIfTrue = (val, key) => {
                if (val === true) {
                    keys.push(key);
                }
            };

            addKeyIfTrue(modelJson.complete, 'divinebeasts.finaltrial.complete');
            addKeyIfTrue(!modelJson.complete, 'divinebeasts.finaltrial.incomplete');

            addKeyIfTrue(modelJson.map, 'divinebeasts.finaltrial.map.obtained');
            addKeyIfTrue(!modelJson.map, 'divinebeasts.finaltrial.map.notobtained');
            
            addKeyIfTrue(modelJson.terminal1, 'divinebeasts.finaltrial.terminal1.on');
            addKeyIfTrue(!modelJson.terminal1, 'divinebeasts.finaltrial.terminal1.off');
            
            addKeyIfTrue(modelJson.terminal2, 'divinebeasts.finaltrial.terminal2.on');
            addKeyIfTrue(!modelJson.terminal2, 'divinebeasts.finaltrial.terminal2.off');
            
            addKeyIfTrue(modelJson.terminal3, 'divinebeasts.finaltrial.terminal3.on');
            addKeyIfTrue(!modelJson.terminal3, 'divinebeasts.finaltrial.terminal3.off');
            
            addKeyIfTrue(modelJson.terminal4, 'divinebeasts.finaltrial.terminal4.on');
            addKeyIfTrue(!modelJson.terminal4, 'divinebeasts.finaltrial.terminal4.off');

            return writeChanges(keys);
        }
    };
})();
