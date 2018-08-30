module.exports = (() => {
    const Offsets = require('../offsets.js');
    const OffsetChecker = require('../offset-checker.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const mapItemSlots = require('./map-item-slots.js');

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

    const getArmorSlots = (saveFile) => {
        return mapItemSlots(saveFile, 'armor', (item, slot) => {
            const quantitiesOffset = Offsets.getQuantitiesOffset(slot);
            const equippedOffset = Offsets.getEquippedSlotOffset(slot);
            
            const equipped = !!OffsetChecker(equippedOffset, saveFile);

            return {
                name: item.name,
                equipped: equipped,
                color: dyes[OffsetChecker(quantitiesOffset, saveFile)]
            };
        });
    };

    return {
        read: (saveFile) => {
            return {
                slots: getArmorSlots(saveFile)
            };
        },
        write: (saveFile, modelJson) => {
            const slotStructure = getItemSlotStructure(saveFile);
            

        }
    };
})();