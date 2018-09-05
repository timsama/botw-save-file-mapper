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
                'runes.alldisabled',
                'runes.selected',
                'runes.bombs.enabled',
                'runes.bombs.plus.enabled',
                'runes.stasis.enabled',
                'runes.stasis.plus.enabled',
                'sheikahslate.sensor.enabled',
                'sheikahslate.sensor.plus.enabled',
                'runes.magnesis.enabled',
                'runes.cryonis.enabled',
                'runes.camera.enabled',
                'runes.mastercyclezero.enabled'
            ]);

            return {
                enabled: !mapValues['runes.alldisabled'],
                selectedIndex: mapValues['runes.selected'],
                bombs: {
                    enabled: mapValues['runes.bombs.enabled'],
                    plus: mapValues['runes.bombs.plus.enabled']
                },
                stasis:  {
                    enabled: mapValues['runes.stasis.enabled'],
                    plus: mapValues['runes.stasis.plus.enabled']
                },
                sheikahsensor: {
                    enabled: mapValues['sheikahslate.sensor.enabled'],
                    plus: mapValues['sheikahslate.sensor.plus.enabled']
                },
                magnesis: {
                    enabled: mapValues['runes.magnesis.enabled']
                },
                cryonis: {
                    enabled: mapValues['runes.cryonis.enabled']
                },
                camera: {
                    enabled: mapValues['runes.camera.enabled']
                },
                mastercyclezero: {
                    enabled: mapValues['runes.mastercyclezero.enabled']
                },
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const writeChanges = getChangeWriter(saveFile, effectMapPath);

            const keys = [];

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

            addKeyIfTrue(modelJson.enabled, `runes.selected=${modelJson.selectedIndex}`);
            addKeyIfFalse(modelJson.enabled, 'runes.alldisabled');

            addKeyIfTrue(modelJson.bombs.enabled, 'runes.bombs.enabled');
            addKeyIfFalse(modelJson.bombs.enabled, 'runes.bombs.disabled');

            addKeyIfTrue(modelJson.bombs.plus, 'runes.bombs.plus.enabled');
            addKeyIfFalse(modelJson.bombs.plus, 'runes.bombs.plus.disabled');

            addKeyIfTrue(modelJson.stasis.enabled, 'runes.stasis.enabled');
            addKeyIfFalse(modelJson.stasis.enabled, 'runes.stasis.disabled');

            addKeyIfTrue(modelJson.stasis.plus, 'runes.stasis.plus.enabled');
            addKeyIfFalse(modelJson.stasis.plus, 'runes.stasis.plus.disabled');

            addKeyIfTrue(modelJson.sheikahsensor.enabled, 'sheikahslate.sensor.enabled');
            addKeyIfFalse(modelJson.sheikahsensor.enabled, 'sheikahslate.sensor.disabled');

            addKeyIfTrue(modelJson.sheikahsensor.plus, 'sheikahslate.sensor.plus.enabled');
            addKeyIfFalse(modelJson.sheikahsensor.plus, 'sheikahslate.sensor.plus.disabled');

            addKeyIfTrue(modelJson.magnesis.enabled, 'runes.magnesis.enabled');
            addKeyIfFalse(modelJson.magnesis.enabled, 'runes.magnesis.disabled');

            addKeyIfTrue(modelJson.cryonis.enabled, 'runes.cryonis.enabled');
            addKeyIfFalse(modelJson.cryonis.enabled, 'runes.cryonis.disabled');

            addKeyIfTrue(modelJson.camera.enabled, 'runes.camera.enabled');
            addKeyIfFalse(modelJson.camera.enabled, 'runes.camera.disabled');
            
            addKeyIfTrue(modelJson.mastercyclezero.enabled, 'runes.mastercyclezero.enabled');
            addKeyIfFalse(modelJson.mastercyclezero.enabled, 'runes.mastercyclezero.disabled');

            return writeChanges(keys);
        }
    };
})();