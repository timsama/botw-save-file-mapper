module.exports = (() => {
    const Offsets = require('../offsets.js');
    const OffsetChecker = require('../offset-checker.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const mapItemSlots = require('./map-item-slots.js');

    const getKeyItemSlots = (saveFile) => {
        return mapItemSlots(saveFile, 'keyitems', (item, slot) => {
            const quantitiesOffset = Offsets.getQuantitiesOffset(slot);

            return {
                name: item.name,
                unique: item.unique,
                stackable: item.stackable,
                quantity: OffsetChecker(quantitiesOffset, saveFile)
            };
        });
    };

    return {
        read: (saveFile) => {
            return {
                slots: getKeyItemSlots(saveFile)
            };
        },
        write: (saveFile, modelJson) => {
            const slotStructure = getItemSlotStructure(saveFile);
            

        }
    };
})();