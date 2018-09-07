module.exports = (() => {
    const SideQuest = require('./quest.model.js')('sidequests');
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
                agiftfromthemonks: SideQuest.read('agiftfromthemonks', saveFile, keypathReader, changeReader),
                byfireflyslight: SideQuest.read('byfireflyslight', saveFile, keypathReader, changeReader),
                findkheel: SideQuest.read('findkheel', saveFile, keypathReader, changeReader),
                flownthecoop: SideQuest.read('flownthecoop', saveFile, keypathReader, changeReader),
                robbiesresearch: SideQuest.read('robbiesresearch', saveFile, keypathReader, changeReader),
                slatedforupgrades: SideQuest.read('slatedforupgrades', saveFile, keypathReader, changeReader),
                thepricelessmaracas: SideQuest.read('thepricelessmaracas', saveFile, keypathReader, changeReader),
                trialofthesword: SideQuest.read('trialofthesword', saveFile, keypathReader, changeReader)
            };
        },
        write: (modelJson, saveFile, options, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const keypathReader = getKeypathReader(effectMapPath);
            const changeWriter = getChangeWriter(saveFile, effectMapPath);

            return SideQuest.write('agiftfromthemonks', modelJson.agiftfromthemonks, saveFile, keypathReader, changeWriter, options)
                .then(() => SideQuest.write('byfireflyslight', modelJson.byfireflyslight, saveFile, keypathReader, changeWriter, options))
                .then(() => SideQuest.write('findkheel', modelJson.findkheel, saveFile, keypathReader, changeWriter, options))
                .then(() => SideQuest.write('flownthecoop', modelJson.flownthecoop, saveFile, keypathReader, changeWriter, options))
                .then(() => SideQuest.write('robbiesresearch', modelJson.robbiesresearch, saveFile, keypathReader, changeWriter, options))
                .then(() => SideQuest.write('slatedforupgrades', modelJson.slatedforupgrades, saveFile, keypathReader, changeWriter, options))
                .then(() => SideQuest.write('thepricelessmaracas', modelJson.thepricelessmaracas, saveFile, keypathReader, changeWriter, options))
                .then(() => SideQuest.write('trialofthesword', modelJson.trialofthesword, saveFile, keypathReader, changeWriter, options));
        }
    };
})();
