module.exports = (() => {
    const SideQuests = require('./sidequests.model.js');
    const Memories = require('./memories.model.js');

    return {
        read: (saveFile, effectMapPath) => {
            return {
                sidequests: SideQuests.read(saveFile, effectMapPath),
                memories: Memories.read(saveFile, effectMapPath)
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            return Memories.write(modelJson.memories, saveFile, effectMapPath)
                .then(() => SideQuests.write(modelJson.sidequests, saveFile, effectMapPath))
        }
    };
})();