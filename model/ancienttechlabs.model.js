module.exports = (() => {
    const AncientTechLab = require('./ancienttechlab.model.js');

    return {
        read: (saveFile, effectMapPath) => {
            return {
                akkala: AncientTechLab.read('akkala', saveFile, effectMapPath),
                hateno: AncientTechLab.read('hateno', saveFile, effectMapPath)
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            return AncientTechLab.write('hateno', modelJson.hateno, saveFile, effectMapPath)
                .then(() => AncientTechLab.write('akkala', modelJson.akkala, saveFile, effectMapPath));
        }
    };
})();