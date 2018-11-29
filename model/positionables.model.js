module.exports = (() => {
    const Moveable = require('./moveable.model.js');
    const Positionable = require('./positionable.model.js');
    const CONFIG = require('../config.json');
    const changeReader = require('../lib/read-changes.js');
    const changeWriter = require('../lib/batch-apply-changes.js');
    const defaultEffectMap = `${CONFIG.mapfilepath}effectmap.json`;
    const mapFileUtils = require('../util/map-file-utils.js');

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

            return {
                starfragment: Moveable.read('starfragment', saveFile, changeReader),
                travelmedallion: Moveable.read('travelmedallion', saveFile, changeReader),
                tamehorse: Moveable.read('horses.selected', saveFile, changeReader),
                wildhorse: Positionable.read('horses.wild', saveFile, keypathReader, changeReader),
                link: Positionable.read('link', saveFile, keypathReader, changeReader)
            };
        },
        write: (modelJson, saveFile, options, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const keypathReader = getKeypathReader(effectMapPath);
            const changeWriter = getChangeWriter(saveFile, effectMapPath);

            return Moveable.write('starfragment', modelJson.starfragment, saveFile, changeWriter, options)
                .then(() => Moveable.write('travelmedallion', modelJson.travelmedallion, saveFile, changeWriter, options))
                .then(() => Moveable.write('horses.selected', modelJson.tamehorse, saveFile, changeWriter, options))
                .then(() => Positionable.write('horses.wild', modelJson.wildhorse, saveFile, keypathReader, changeWriter, options))
                .then(() => Positionable.write('link', modelJson.link, saveFile, keypathReader, changeWriter, options));
        }
    };
})();
