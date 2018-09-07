module.exports = (() => {
    const Offsets = require('../lib/offsets.js');
    const OffsetChecker = require('../lib/offset-checker.js');
    const OffsetSetter = require('../lib/offset-setter.js');
    const mapItemSlots = require('./map-item-slots.js');
    const writeItemSlots = require('./write-item-slots.js');

    const getKeyItemSlots = (saveFile, startingSlot) => {
        return mapItemSlots(saveFile, startingSlot, 'keyitems', (item, slot) => {
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
        read: (saveFile, startingSlot) => {
            return {
                slots: getKeyItemSlots(saveFile, startingSlot)
            };
        },
        write: (modelJson, saveFile, startingSlot) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            return writeItemSlots(saveFile, modelJson.slots, startingSlot, 'keyitems', (item, slot, slotInCategory) => {
                const equippedOffset = Offsets.getEquippedSlotOffset(slot);
                const quantitiesOffset = Offsets.getQuantitiesOffset(slot);

                return [
                    {
                        offset: equippedOffset,
                        value: 0
                    },
                    {
                        offset: quantitiesOffset,
                        value: item.quantity || 1
                    }
                ];
            });
        }
    };
})();