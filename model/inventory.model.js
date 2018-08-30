module.exports = (() => {
    const KeyItems = require('./keyitems.model.js');

    return {
        read: (saveFile) => {
            return {
                keyitems: KeyItems.read(saveFile)
            };
        },
        write: (saveFile, modelJson) => {
            KeyItems.write(saveFile, modelJson.keyitems);
        }
    };
})();