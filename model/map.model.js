module.exports = (() => {
    const AncientTechLabs = require('./ancienttechlabs.model.js');
    const DivineBeasts = require('./divinebeasts.model.js');
    const Towers = require('./towers.model.js');

    return {
        read: (saveFile, effectMapPath) => {
            return {
                towers: Towers.read(saveFile, effectMapPath),
                divinebeasts: DivineBeasts.read(saveFile, effectMapPath),
                ancienttechlabs: AncientTechLabs.read(saveFile, effectMapPath),
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            return DivineBeasts.write(modelJson.divinebeasts, saveFile, effectMapPath)
                .then(() => Towers.write(modelJson.towers, saveFile, effectMapPath))
                .then(() => AncientTechLabs.write(modelJson.ancienttechlabs, saveFile, effectMapPath))
        }
    };
})();