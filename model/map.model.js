module.exports = (() => {
    const DivineBeasts = require('./divinebeasts.model.js');

    return {
        read: (saveFile, effectMapPath) => {
            return {
                divinebeasts: DivineBeasts.read(saveFile, effectMapPath),
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            DivineBeasts.write(modelJson.divinebeasts, saveFile, effectMapPath);
        }
    };
})();