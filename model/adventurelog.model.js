module.exports = (() => {
    const MainQuests = require('./mainquests.model.js');
    const ShrineQuests = require('./shrinequests.model.js');
    const SideQuests = require('./sidequests.model.js');
    const Memories = require('./memories.model.js');

    return {
        read: (saveFile, effectMapPath) => {
            return {
                mainquests: MainQuests.read(saveFile, effectMapPath),
                sidequests: SideQuests.read(saveFile, effectMapPath),
                shrinequests: ShrineQuests.read(saveFile, effectMapPath),
                memories: Memories.read(saveFile, effectMapPath)
            };
        },
        write: (modelJson, saveFile, options, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            return MainQuests.write(modelJson.mainquests, saveFile, options, effectMapPath)
                .then(() => ShrineQuests.write(modelJson.shrinequests, saveFile, options, effectMapPath))
                .then(() => SideQuests.write(modelJson.sidequests, saveFile, options, effectMapPath))
                .then(() => Memories.write(modelJson.memories, saveFile, options, effectMapPath));
        }
    };
})();