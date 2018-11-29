module.exports = (() => {
    const AncientTechLabs = require('./ancienttechlabs.model.js');
    const DivineBeasts = require('./divinebeasts.model.js');
    const Towers = require('./towers.model.js');
    const Shrines = require('./shrines.model.js');
    const Positionables = require('./positionables.model.js');

    return {
        read: (saveFile, effectMapPath) => {
            return {
                towers: Towers.read(saveFile, effectMapPath),
                divinebeasts: DivineBeasts.read(saveFile, effectMapPath),
                ancienttechlabs: AncientTechLabs.read(saveFile, effectMapPath),
                shrines: Shrines.read(saveFile, effectMapPath),
                positionables: Positionables.read(saveFile, effectMapPath)
            };
        },
        write: (modelJson, saveFile, options, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            return DivineBeasts.write(modelJson.divinebeasts, saveFile, options, effectMapPath)
                .then(() => Towers.write(modelJson.towers, saveFile, options, effectMapPath))
                .then(() => AncientTechLabs.write(modelJson.ancienttechlabs, saveFile, options, effectMapPath))
                .then(() => Shrines.write(modelJson.shrines, saveFile, options, effectMapPath))
                .then(() => Positionables.write(modelJson.positionables, saveFile, options, effectMapPath));
        }
    };
})();