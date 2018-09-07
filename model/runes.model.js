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

            const addKeyBranches = (val, baseKey, extensionTrue, extensionFalse) => {
                if (val === true) {
                    keys.push(`${baseKey}.${extensionTrue}`);
                }
                if (val === false) {
                    keys.push(`${baseKey}.${extensionFalse}`);
                }
            };

            addKeyBranches(modelJson.enabled, 'runes', `selected=${modelJson.selectedIndex || 0}`, 'alldisabled');

            modelJson.bombs && addKeyBranches(modelJson.bombs.enabled, 'runes.bombs', 'enabled', 'disabled');
            modelJson.bombs && addKeyBranches(modelJson.bombs.plus, 'runes.bombs.plus', 'enabled', 'disabled');
            modelJson.camera && addKeyBranches(modelJson.camera.enabled, 'runes.camera', 'enabled', 'disabled');
            modelJson.cryonis && addKeyBranches(modelJson.cryonis.enabled, 'runes.cryonis', 'enabled', 'disabled');
            modelJson.mastercyclezero && addKeyBranches(modelJson.mastercyclezero.enabled, 'runes.mastercyclezero', 'enabled', 'disabled');
            modelJson.magnesis && addKeyBranches(modelJson.magnesis.enabled, 'runes.magnesis', 'enabled', 'disabled');
            modelJson.stasis && addKeyBranches(modelJson.stasis.enabled, 'runes.stasis', 'enabled', 'disabled');
            modelJson.stasis && addKeyBranches(modelJson.stasis.plus, 'runes.stasis.plus', 'enabled', 'disabled');
            modelJson.sheikahsensor && addKeyBranches(modelJson.sheikahsensor.enabled, 'sheikahslate.sensor', 'enabled', 'disabled');
            modelJson.sheikahsensor && addKeyBranches(modelJson.sheikahsensor.plus, 'sheikahslate.sensor.plus', 'enabled', 'disabled');

            return writeChanges(keys);
        }
    };
})();