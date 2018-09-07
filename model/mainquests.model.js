module.exports = (() => {
    const MainQuest = require('./quest.model.js')('mainquests');
    const CONFIG = require('../config.js');
    const changeReader = require('../read-changes.js');
    const changeWriter = require('../batch-apply-changes.js');
    const defaultEffectMap = `${CONFIG.mapfilepath}effectmap.json`;
    const mapFileUtils = require('../util/map-file-utils.js');

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
                capturedmemories: MainQuest.read('capturedmemories', saveFile, keypathReader, changeReader),
                championdarukssong: MainQuest.read('championdarukssong', saveFile, keypathReader, changeReader),
                championmiphassong: MainQuest.read('championmiphassong', saveFile, keypathReader, changeReader),
                championrevalissong: MainQuest.read('championrevalissong', saveFile, keypathReader, changeReader),
                championurbosassong: MainQuest.read('championurbosassong', saveFile, keypathReader, changeReader),
                destroyganon: MainQuest.read('destroyganon', saveFile, keypathReader, changeReader),
                divinebeastvahmedoh: MainQuest.read('divinebeastvahmedoh', saveFile, keypathReader, changeReader),
                divinebeastvahnaboris: MainQuest.read('divinebeastvahnaboris', saveFile, keypathReader, changeReader),
                divinebeastvahrudania: MainQuest.read('divinebeastvahrudania', saveFile, keypathReader, changeReader),
                divinebeastvahruta: MainQuest.read('divinebeastvahruta', saveFile, keypathReader, changeReader),
                findthefairyfountain: MainQuest.read('findthefairyfountain', saveFile, keypathReader, changeReader),
                followthesheikahslate: MainQuest.read('followthesheikahslate', saveFile, keypathReader, changeReader),
                forbiddencityentry: MainQuest.read('forbiddencityentry', saveFile, keypathReader, changeReader),
                freethedivinebeasts: MainQuest.read('freethedivinebeasts', saveFile, keypathReader, changeReader),
                lockedmementos: MainQuest.read('lockedmementos', saveFile, keypathReader, changeReader),
                reachzorasdomain: MainQuest.read('reachzorasdomain', saveFile, keypathReader, changeReader),
                seekoutimpa: MainQuest.read('seekoutimpa', saveFile, keypathReader, changeReader),
                thechampionsballad: MainQuest.read('thechampionsballad', saveFile, keypathReader, changeReader),
                theherossword: MainQuest.read('theherossword', saveFile, keypathReader, changeReader),
                theisolatedplateau: MainQuest.read('theisolatedplateau', saveFile, keypathReader, changeReader)
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const keypathReader = getKeypathReader(effectMapPath);
            const changeWriter = getChangeWriter(saveFile, effectMapPath);

            return MainQuest.write('capturedmemories', modelJson.capturedmemories, saveFile, keypathReader, changeWriter)
                .then(() => MainQuest.write('championdarukssong', modelJson.championdarukssong, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('championmiphassong', modelJson.championmiphassong, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('championrevalissong', modelJson.championrevalissong, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('championurbosassong', modelJson.championurbosassong, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('destroyganon', modelJson.destroyganon, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('divinebeastvahmedoh', modelJson.divinebeastvahmedoh, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('divinebeastvahnaboris', modelJson.divinebeastvahnaboris, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('divinebeastvahrudania', modelJson.divinebeastvahrudania, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('divinebeastvahruta', modelJson.divinebeastvahruta, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('findthefairyfountain', modelJson.findthefairyfountain, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('followthesheikahslate', modelJson.followthesheikahslate, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('forbiddencityentry', modelJson.forbiddencityentry, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('freethedivinebeasts', modelJson.freethedivinebeasts, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('lockedmementos', modelJson.lockedmementos, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('reachzorasdomain', modelJson.reachzorasdomain, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('seekoutimpa', modelJson.seekoutimpa, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('thechampionsballad', modelJson.thechampionsballad, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('theherossword', modelJson.theherossword, saveFile, keypathReader, changeWriter))
                .then(() => MainQuest.write('theisolatedplateau', modelJson.theisolatedplateau, saveFile, keypathReader, changeWriter));
        }
    };
})();
