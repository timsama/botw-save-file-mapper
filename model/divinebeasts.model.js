module.exports = (() => {
    const VahRuta = require('./vahruta.model.js');

    return {
        read: (saveFile, effectMapPath) => {
            return {
                vahruta: VahRuta.read(saveFile, effectMapPath),
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            VahRuta.write(modelJson.vahruta, saveFile, effectMapPath);
        }
    };
})();