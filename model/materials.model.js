module.exports = (() => {
    const Offsets = require('../offsets.js');
    const OffsetChecker = require('../offset-checker.js');
    const OffsetSetter = require('../offset-setter.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const mapItemSlots = require('./map-item-slots.js');
    const writeItemSlots = require('./write-item-slots.js');

    const getMaterialsSlots = (saveFile) => {
        return mapItemSlots(saveFile, 'materials', (item, slot) => {
            const quantitiesOffset = Offsets.getQuantitiesOffset(slot);

            return {
                name: item.name,
                quantity: OffsetChecker(quantitiesOffset, saveFile)
            };
        });
    };

    return {
        read: (saveFile) => {
            return {
                slots: getMaterialsSlots(saveFile)
            };
        },
        write: (modelJson, saveFile) => {
            writeItemSlots(saveFile, modelJson.slots, 'materials', (item, slot, slotInCategory) => {
                const equippedOffset = Offsets.getEquippedSlotOffset(slot);
                const quantitiesOffset = Offsets.getQuantitiesOffset(slot);

                OffsetSetter(equippedOffset, 0, saveFile);
                OffsetSetter(quantitiesOffset, item.quantity, saveFile);
            });
        }
    };
})();