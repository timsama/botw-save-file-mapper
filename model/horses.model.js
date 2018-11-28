module.exports = (() => {
    const Horse = require('./horse.model.js');
    const CONFIG = require('../config.json');
    const changeReader = require('../lib/read-changes.js');
    const defaultEffectMap = `${CONFIG.mapfilepath}effectmap.json`;
    const mapFileUtils = require('../util/map-file-utils.js');

    const getChangeReader = (saveFile, effectMapPath) => {
        return (keys, withLogging) => {
            return changeReader(saveFile)(effectMapPath || defaultEffectMap, keys, withLogging);
        };
    };

    const getKeypathReader = (effectMapPath) => {
        const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(effectMapPath || defaultEffectMap);
        return (keypath) => {
            return mapFileUtils.getValueAtKeyPath(effectMap, keypath);
        };
    };

    return {
        read: (saveFile, effectMapPath) => {
            const keypathReader = getKeypathReader(effectMapPath);
            const changeReader = getChangeReader(saveFile, effectMapPath);
            let selectedSlot = changeReader(['horses.selected.slot'])['horses.selected.slot'];
            if (selectedSlot === 0xFFFFFFFF) {
                selectedSlot = undefined;
            }

            return {
                selected: {
                    slot: selectedSlot
                },
                wild: Horse.read('wild', saveFile, keypathReader, changeReader),
                slot1: Horse.read('slot1', saveFile, keypathReader, changeReader),
                slot2: Horse.read('slot2', saveFile, keypathReader, changeReader),
                slot3: Horse.read('slot3', saveFile, keypathReader, changeReader),
                slot4: Horse.read('slot4', saveFile, keypathReader, changeReader),
                slot5: Horse.read('slot5', saveFile, keypathReader, changeReader),
            };
        }
    };
})();
