module.exports = (() => {
    const VahMedoh = require('./vahmedoh.model.js');
    const VahRudania = require('./vahrudania.model.js');
    const VahRuta = require('./vahruta.model.js');
    const VahNaboris = require('./vahnaboris.model.js');

    return {
        read: (saveFile, effectMapPath) => {
            return {
                vahmedoh: VahMedoh.read(saveFile, effectMapPath),
                vahrudania: VahRudania.read(saveFile, effectMapPath),
                vahruta: VahRuta.read(saveFile, effectMapPath),
                vahnaboris: VahNaboris.read(saveFile, effectMapPath),
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            return VahMedoh.write(modelJson.vahmedoh, saveFile, effectMapPath)
                .then(() => VahRudania.write(modelJson.vahrudania, saveFile, effectMapPath))
                .then(() => VahRuta.write(modelJson.vahruta, saveFile, effectMapPath))
                .then(() => VahNaboris.write(modelJson.vahnaboris, saveFile, effectMapPath))
        }
    };
})();