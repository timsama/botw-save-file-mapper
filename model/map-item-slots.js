module.exports = (() => {
    const getItemNameAtSlot = require('../get-item-name-at-slot.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const batchOffsetChecker = require('../batch-offset-checker.js');
    const getItemNameFromEntries = require('../get-item-name-from-entries.js');
    const Offsets = require('../offsets.js');
    const itemFileUtils = require('../item-file-utils.js');
    const relativeOffsets = Array.apply(0, new Array(Offsets.slotWidth / 8)).map((e, i) => i * 8);

    return (saveFile, firstSlotToRead, category, func) => {
        const getEntriesForSlot = (slot) => {
            const baseOffset = Offsets.getItemOffset(slot);

            const offsets = relativeOffsets.map((relativeOffset) => {
                return baseOffset + relativeOffset;
            });

            return batchOffsetChecker(offsets, saveFile).map(entry => {
                return {
                    offset: entry.offset - baseOffset,
                    value: entry.value
                };
            });
        };

        const itemsFilepath = itemFileUtils.getCategoryFilepath(category);
        const itemsJson = itemFileUtils.getFileAsJsonOrEmptyJsObject(itemsFilepath);
        const getItemName = getItemNameFromEntries(category);

        const items = [];
        let slot = firstSlotToRead;
        let isInCategory = true;

        while(isInCategory) {
            const slotInCategory = slot - firstSlotToRead;
            const entries = getEntriesForSlot(slot);
            const name = getItemName(entries);
            isInCategory = !!itemsJson[name];

            if (isInCategory) {
                const itemJson = itemsJson[name];
                itemJson.name = name;

                const item = func(itemJson, slot, slotInCategory);
                items.push(item);
            }

            slot++;
        }

        return items;
    };

    // return (saveFile, category, func) => {
    //     const itemsFilepath = itemFileUtils.getCategoryFilepath(category);
    //     const itemsJson = itemFileUtils.getFileAsJsonOrEmptyJsObject(itemsFilepath);
    //     const slotStructure = getItemSlotStructure(saveFile);
    //     const categorySlotStructure = slotStructure[category];
    //     const getItemName = getItemNameFromEntries(category);

    //     const slots = [];
    //     for (let slot = categorySlotStructure.first; slot <= categorySlotStructure.last; slot++) {
    //         slots.push(slot);
    //     }

    //     const slotEntries = batchGetItemEntries(slots, saveFile);

    //     const namedSlots = slotEntries.map(slotEntry => {
    //         return {
    //             slot: slotEntry.slot,
    //             name: getItemName(slotEntry.entries)
    //         };
    //     });

    //     return namedSlots.map(namedSlot => {
    //         const slotInCategory = namedSlot.slot - categorySlotStructure.first;
    //         if (!!namedSlot.name) {
    //             const itemJson = itemsJson[namedSlot.name];
    //             itemJson.name = namedSlot.name;

    //             return func(itemJson, namedSlot.slot, slotInCategory);
    //         } else {
    //             console.log(`Item at slot ${namedSlot.slot} could not be found!`);
    //             return undefined;
    //         }
    //     }).filter(item => !!item);
    // };
})();