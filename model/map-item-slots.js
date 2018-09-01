module.exports = (() => {
    const getItemNameAtSlot = require('../get-item-name-at-slot.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const batchGetItemEntries = require('../batch-get-item-entries.js');
    const getItemNameFromEntries = require('../get-item-name-from-entries.js');
    const itemFileUtils = require('../item-file-utils.js');

    return (saveFile, category, func) => {
        const itemsFilepath = itemFileUtils.getCategoryFilepath(category);
        const itemsJson = itemFileUtils.getFileAsJsonOrEmptyJsObject(itemsFilepath);
        const slotStructure = getItemSlotStructure(saveFile)[category];
        const getItemName = getItemNameFromEntries(category);

        const slots = [];
        for (let slot = slotStructure.first; slot <= slotStructure.last; slot++) {
            slots.push(slot);
        }

        const slotEntries = batchGetItemEntries(slots, saveFile);

        const namedSlots = slotEntries.map(slotEntry => {
            return {
                slot: slotEntry.slot,
                name: getItemName(slotEntry.entries)
            };
        });

        return namedSlots.map(namedSlot => {
            const slotInCategory = namedSlot.slot - slotStructure.first;
            if (!!namedSlot.name) {
                const itemJson = itemsJson[namedSlot.name];
                itemJson.name = namedSlot.name;

                return func(itemJson, namedSlot.slot, slotInCategory);
            } else {
                console.log(`Item at slot ${namedSlot.slot} could not be found!`);
                return undefined;
            }
        }).filter(item => !!item);
    };
})();