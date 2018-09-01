module.exports = (() => {
    const Offsets = require('../offsets.js');
    const OffsetChecker = require('../offset-checker.js');
    const OffsetSetter = require('../offset-setter.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const mapItemSlots = require('./map-item-slots.js');
    const writeItemSlots = require('./write-item-slots.js');

    const dyes = {
        0: "original",
        1: "blue",
        2: "red",
        3: "yellow",
        4: "white",
        5: "black",
        6: "purple",
        7: "green",
        8: "lightblue",
        9: "navy",
        10: "orange",
        11: "peach",
        12: "crimson",
        13: "lightyellow",
        14: "brown",
        15: "gray"
    };

    const dyesEnum = {
        "original": 0,
        "blue": 1,
        "red": 2,
        "yellow": 3,
        "white": 4,
        "black": 5,
        "purple": 6,
        "green": 7,
        "lightblue": 8,
        "navy": 9,
        "orange": 10,
        "peach": 11,
        "crimson": 12,
        "lightyellow": 13,
        "brown": 14,
        "gray": 15
    };

    const getArmorSlots = (saveFile) => {
        return mapItemSlots(saveFile, 'armor', (item, slot) => {
            const colorOffset = Offsets.getQuantitiesOffset(slot);
            const equippedOffset = Offsets.getEquippedSlotOffset(slot);

            const color = dyes[OffsetChecker(colorOffset, saveFile)];
            const equipped = !!OffsetChecker(equippedOffset, saveFile);

            const armor = {
                name: item.name,
                equipped: equipped,
            };

            if (color !== 'original') {
                armor.color = color;
            }

            return armor;
        });
    };

    return {
        read: (saveFile) => {
            return {
                slots: getArmorSlots(saveFile)
            };
        },
        write: (modelJson, saveFile) => {
            writeItemSlots(saveFile, modelJson.slots, 'armor', (item, slot, slotInCategory) => {
                const equippedOffset = Offsets.getEquippedSlotOffset(slot);
                const colorOffset = Offsets.getQuantitiesOffset(slot);

                OffsetSetter(equippedOffset, item.equipped ? 1 : 0, saveFile);
                OffsetSetter(colorOffset, dyesEnum[item.color] || 0, saveFile);
            });
        }
    };
})();