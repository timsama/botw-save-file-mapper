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
            const weapons = Weapons.read(saveFile, 0);
            const bowStart = weapons.slots.length;
            const bows = Bows.read(saveFile, bowStart);
            const arrowStart = bowStart + bows.slots.length;
            const arrows = Arrows.read(saveFile, arrowStart);
            const shieldStart = arrowStart + arrows.slots.length;
            const shields = Shields.read(saveFile, shieldStart);
            const armorStart = shieldStart + shields.slots.length;
            const armor = Armor.read(saveFile, armorStart);
            const materialStart = armorStart + armor.slots.length;
            const materials = Materials.read(saveFile, materialStart);
            const foodStart = materialStart + materials.slots.length;
            const food = Food.read(saveFile, foodStart);
            const keyItemStart = foodStart + food.slots.length;
            const keyitems = KeyItems.read(saveFile, keyItemStart);

            return {
                weapons: weapons,
                bows: bows,
                arrows: arrows,
                shields: shields,
                armor: armor,
                materials: materials,
                food: food,
                keyitems: keyitems
            };
        },
        write: (modelJson, saveFile) => {
            return Weapons.write(modelJson.weapons, saveFile, 0)
                .then(nextAvailableSlot => Bows.write(modelJson.bows, saveFile, nextAvailableSlot))
                .then(nextAvailableSlot => Arrows.write(modelJson.arrows, saveFile, nextAvailableSlot))
                .then(nextAvailableSlot => Shields.write(modelJson.shields, saveFile, nextAvailableSlot))
                .then(nextAvailableSlot => Armor.write(modelJson.armor, saveFile, nextAvailableSlot))
                .then(nextAvailableSlot => Materials.write(modelJson.materials, saveFile, nextAvailableSlot))
                .then(nextAvailableSlot => Food.write(modelJson.food, saveFile, nextAvailableSlot))
                .then(nextAvailableSlot => KeyItems.write(modelJson.keyitems, saveFile, nextAvailableSlot));
        }
    };
})();