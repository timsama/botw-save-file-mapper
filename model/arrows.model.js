module.exports = (() => {
    const Offsets = require('../offsets.js');
    const OffsetChecker = require('../offset-checker.js');
    const OffsetSetter = require('../offset-setter.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const mapItemSlots = require('./map-item-slots.js');
    const writeItemSlots = require('./write-item-slots.js');

    const getArrowSlots = (saveFile) => {
        return mapItemSlots(saveFile, 'arrows', (item, slot) => {
            const quantitiesOffset = Offsets.getQuantitiesOffset(slot);
            const equippedOffset = Offsets.getEquippedSlotOffset(slot);
            
            const equipped = !!OffsetChecker(equippedOffset, saveFile);

            return {
                name: item.name,
                equipped: equipped,
                quantity: OffsetChecker(quantitiesOffset, saveFile)
            };
        });
    };

    return {
        read: (saveFile) => {
            return {
                slots: getArrowSlots(saveFile)
            };
        },
        write: (modelJson, saveFile) => {
            writeItemSlots(saveFile, modelJson.slots, 'arrows', (item, slot, slotInCategory) => {
                const equippedOffset = Offsets.getEquippedSlotOffset(slot);
                const quantitiesOffset = Offsets.getQuantitiesOffset(slot);

                OffsetSetter(equippedOffset, item.equipped ? 1 : 0, saveFile);
                OffsetSetter(quantitiesOffset, item.quantity, saveFile);
            });
        }
    };
})();