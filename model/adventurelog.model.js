module.exports = (() => {
    const Memories = require('./memories.model.js');

    return {
        read: (saveFile, effectMapPath) => {
            return {
                memories: Memories.read(saveFile, effectMapPath)
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            return Memories.write(modelJson.memories, saveFile, effectMapPath)
        }
    };
})();