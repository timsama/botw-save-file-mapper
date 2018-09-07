module.exports = (() => {
    const Memory = require('./memory.model.js');
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
                apremonition: Memory.read('apremonition', saveFile, keypathReader, changeReader),
                bladesoftheyiga: Memory.read('bladesoftheyiga', saveFile, keypathReader, changeReader),
                championdarukssong: Memory.read('championdarukssong', saveFile, keypathReader, changeReader),
                championmiphassong: Memory.read('championmiphassong', saveFile, keypathReader, changeReader),
                championrevalissong: Memory.read('championrevalissong', saveFile, keypathReader, changeReader),
                championurbosassong: Memory.read('championurbosassong', saveFile, keypathReader, changeReader),
                daruksmettle: Memory.read('daruksmettle', saveFile, keypathReader, changeReader),
                despair: Memory.read('despair', saveFile, keypathReader, changeReader),
                fatheranddaughter: Memory.read('fatheranddaughter', saveFile, keypathReader, changeReader),
                miphastouch: Memory.read('miphastouch', saveFile, keypathReader, changeReader),
                resolveandgrief: Memory.read('resolveandgrief', saveFile, keypathReader, changeReader),
                returnofcalamityganon: Memory.read('returnofcalamityganon', saveFile, keypathReader, changeReader),
                revalisflap: Memory.read('revalisflap', saveFile, keypathReader, changeReader),
                shelterfromthestorm: Memory.read('shelterfromthestorm', saveFile, keypathReader, changeReader),
                silentprincess: Memory.read('silentprincess', saveFile, keypathReader, changeReader),
                slumberingpower: Memory.read('slumberingpower', saveFile, keypathReader, changeReader),
                subduedceremony: Memory.read('subduedceremony', saveFile, keypathReader, changeReader),
                thechampionsballad: Memory.read('thechampionsballad', saveFile, keypathReader, changeReader),
                themastersword: Memory.read('themastersword', saveFile, keypathReader, changeReader),
                tomountlanayru: Memory.read('tomountlanayru', saveFile, keypathReader, changeReader),
                urbosashand: Memory.read('urbosashand', saveFile, keypathReader, changeReader),
                zeldasawakening: Memory.read('zeldasawakening', saveFile, keypathReader, changeReader),
                zeldasresentment: Memory.read('zeldasresentment', saveFile, keypathReader, changeReader)
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const keypathReader = getKeypathReader(effectMapPath);
            const changeWriter = getChangeWriter(saveFile, effectMapPath);

            return Memory.write('apremonition', modelJson.apremonition, saveFile, keypathReader, changeWriter)
                .then(() => Memory.write('bladesoftheyiga', modelJson.bladesoftheyiga, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('championdarukssong', modelJson.championdarukssong, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('championmiphassong', modelJson.championmiphassong, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('championrevalissong', modelJson.championrevalissong, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('championurbosassong', modelJson.championurbosassong, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('daruksmettle', modelJson.daruksmettle, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('despair', modelJson.despair, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('fatheranddaughter', modelJson.fatheranddaughter, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('miphastouch', modelJson.miphastouch, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('resolveandgrief', modelJson.resolveandgrief, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('returnofcalamityganon', modelJson.returnofcalamityganon, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('revalisflap', modelJson.revalisflap, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('shelterfromthestorm', modelJson.shelterfromthestorm, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('silentprincess', modelJson.silentprincess, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('slumberingpower', modelJson.slumberingpower, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('subduedceremony', modelJson.subduedceremony, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('thechampionsballad', modelJson.thechampionsballad, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('themastersword', modelJson.themastersword, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('tomountlanayru', modelJson.tomountlanayru, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('urbosashand', modelJson.urbosashand, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('zeldasawakening', modelJson.zeldasawakening, saveFile, keypathReader, changeWriter))
                .then(() => Memory.write('zeldasresentment', modelJson.zeldasresentment, saveFile, keypathReader, changeWriter));
        }
    };
})();
