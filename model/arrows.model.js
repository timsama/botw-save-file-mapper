module.exports = (() => {
    const Offsets = require('../lib/offsets.js');
    const OffsetChecker = require('../lib/offset-checker.js');
    const OffsetSetter = require('../lib/offset-setter.js');
    const mapItemSlots = require('./map-item-slots.js');
    const writeItemSlots = require('./write-item-slots.js');

    const getArrowSlots = (saveFile, startingSlot) => {
        return mapItemSlots(saveFile, startingSlot, 'arrows', (item, slot) => {
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
        read: (saveFile, startingSlot) => {
            return {
                slots: getArrowSlots(saveFile, startingSlot)
            };
        },
        write: (modelJson, saveFile, startingSlot) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            return writeItemSlots(saveFile, modelJson.slots, startingSlot, 'arrows', (item, slot, slotInCategory) => {
                const equippedOffset = Offsets.getEquippedSlotOffset(slot);
                const quantitiesOffset = Offsets.getQuantitiesOffset(slot);

                return [
                    {
                        offset: equippedOffset,
                        value: item.equipped ? 1 : 0
                    },
                    {
                        offset: quantitiesOffset,
                        value: item.quantity
                    }
                ];
            });
        }
    };
})();