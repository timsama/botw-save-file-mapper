module.exports = (() => {
    const Weapons = require('./weapons.model.js');
    const Bows = require('./bows.model.js');
    const Arrows = require('./arrows.model.js');
    const Shields = require('./shields.model.js');
    const Armor = require('./armor.model.js');
    const Materials = require('./materials.model.js');
    const Food = require('./food.model.js');
    const KeyItems = require('./keyitems.model.js');

    return {
        read: (saveFile) => {
            return {
                weapons: Weapons.read(saveFile),
                bows: Bows.read(saveFile),
                arrows: Arrows.read(saveFile),
                shields: Shields.read(saveFile),
                armor: Armor.read(saveFile),
                materials: Materials.read(saveFile),
                food: Food.read(saveFile),
                keyitems: KeyItems.read(saveFile)
            };
        },
        write: (saveFile, modelJson) => {
            Weapons.write(saveFile, modelJson.weapons);
            Bows.write(saveFile, modelJson.bows);
            Arrows.write(saveFile, modelJson.arrows);
            Shields.write(saveFile, modelJson.shields);
            Armor.write(saveFile, modelJson.armor);
            Materials.write(saveFile, modelJson.materials);
            Food.write(saveFile, modelJson.food);
            KeyItems.write(saveFile, modelJson.keyitems);
        }
    };
})();