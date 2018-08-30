module.exports = (() => {
    const Materials = require('./materials.model.js');
    const Food = require('./food.model.js');
    const KeyItems = require('./keyitems.model.js');

    return {
        read: (saveFile) => {
            return {
                materials: Materials.read(saveFile),
                food: Food.read(saveFile),
                keyitems: KeyItems.read(saveFile)
            };
        },
        write: (saveFile, modelJson) => {
            Materials.write(saveFile, modelJson.materials);
            Food.write(saveFile, modelJson.food);
            KeyItems.write(saveFile, modelJson.keyitems);
        }
    };
})();