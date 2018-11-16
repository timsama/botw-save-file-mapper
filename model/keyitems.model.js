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
        write: (modelJson, saveFile, startingSlot, options, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve(startingSlot);
            }

            // these aren't actually unwriteable, but they don't work the way you'd want, so I'm skipping them
            const unwriteableItems = {
                'daruksprotection': true,
                'miphasgrace': true,
                'revalisgale': true,
                'urbosasfury': true
            };

            const writeableItems = modelJson.slots.filter(item => !unwriteableItems[item.name]);

            return writeItemSlots(saveFile, writeableItems, startingSlot, 'keyitems', options, (item, slot, slotInCategory) => {
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