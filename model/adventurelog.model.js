module.exports = (() => {
    const MainQuests = require('./mainquests.model.js');
    const SideQuests = require('./sidequests.model.js');
    const Memories = require('./memories.model.js');

    return {
        read: (saveFile, effectMapPath) => {
            return {
                mainquests: MainQuests.read(saveFile, effectMapPath),
                sidequests: SideQuests.read(saveFile, effectMapPath),
                memories: Memories.read(saveFile, effectMapPath)
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            return MainQuests.write(modelJson.mainquests, saveFile, effectMapPath)
                .then(() => SideQuests.write(modelJson.sidequests, saveFile, effectMapPath))
                .then(() => Memories.write(modelJson.memories, saveFile, effectMapPath));
        }
    };
})();