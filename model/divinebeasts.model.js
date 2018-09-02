module.exports = (() => {
    const VahRudania = require('./vahrudania.model.js');
    const VahRuta = require('./vahruta.model.js');

    return {
        read: (saveFile, effectMapPath) => {
            return {
                vahrudania: VahRudania.read(saveFile, effectMapPath),
                vahruta: VahRuta.read(saveFile, effectMapPath),
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            return VahRuta.write(modelJson.vahruta, saveFile, effectMapPath)
                .then(() => VahRudania.write(modelJson.vahrudania, saveFile, effectMapPath));
        }
    };
})();