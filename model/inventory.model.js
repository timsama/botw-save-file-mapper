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
        write: (modelJson, saveFile) => {
            Weapons.write(modelJson.weapons, saveFile);
            Bows.write(modelJson.bows, saveFile);
            Arrows.write(modelJson.arrows, saveFile);
            Shields.write(modelJson.shields, saveFile);
            Armor.write(modelJson.armor, saveFile);
            Materials.write(modelJson.materials, saveFile);
            KeyItems.write(modelJson.keyitems, saveFile);
        }
    };
})();