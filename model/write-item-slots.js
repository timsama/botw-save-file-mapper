module.exports = (() => {
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const setItemEntries = require('../set-item-entries.js');
    const batchSetItemSlots = require('../batch-set-item-slots.js');
    const batchOffsetSetter = require('../batch-offset-setter.js');
    const itemFileUtils = require('../item-file-utils.js');
    const saveFileUtils = require('../save-file-utils.js');
    const slotInfo = require('../slot-info.js');

    const getCondensedItems = (items, category) => {
        const itemCounts = {};

        const fullyKeyedItems = items.map(item => {
            const categoryFilepath = itemFileUtils.getCategoryFilepath(category);
            const categoryJson = itemFileUtils.getFileAsJsonOrEmptyJsObject(categoryFilepath);
            
            const copy = {};

            Object.keys(item).forEach(key => {
                if (Array.isArray(item[key])) {
                    copy[key] = item[key].slice();    
                } else {
                    copy[key] = item[key];
                }
            });

            if (!!categoryJson[item.name]) {
                copy.entries = categoryJson[item.name].entries.slice();
                copy.stackable = categoryJson[item.name].stackable;
                copy.unique = categoryJson[item.name].unique;
            } else {
                console.error(`${item.name} not found in ${category} item file!`);
                copy.entries = [];
            }

            return copy;
        });

        const filteredItems = fullyKeyedItems.filter((item) => {
            if (item.unique && itemCounts[item.name]) {
                return false
            } else if (item.stackable) {
                const alreadyExisted = !!itemCounts[item.name];

                if (!alreadyExisted) {
                    itemCounts[item.name] = 0;
                }
                
                itemCounts[item.name] += item.quantity;
                
                if (itemCounts[item.name] > 999) {
                    itemCounts[item.name] > 999
                }

                return !alreadyExisted;
            } else {
                itemCounts[item.name] = item.quantity;
                return true;
            }
        })

        const condensedItems = filteredItems.map(item => {
            item.quantity = itemCounts[item.name];
            return item;
        });

        return condensedItems;
    }

    const deleteUnusedSlotsInCategory = (saveFile, firstSlot, slotsUsed, category) => {
        // the slot structure could have changed due to items being written, so we have to re-get it here
        const slotStructure = getItemSlotStructure(saveFile);
        const categorySlotStructure = slotStructure[category];

        const firstUnusedSlot = firstSlot + slotsUsed;

        if (!categorySlotStructure.next) {
            const deletionLength = categorySlotStructure.last - (firstUnusedSlot - 1);
            if (deletionLength > 0) {
                const slotsToDelete = Array.apply(0, new Array(deletionLength)).map(e => {
                    return {
                        entries: []
                    };
                });

                slotsToDelete.forEach((item, deletionIndex) => {
                    const slot = firstUnusedSlot + deletionIndex;

                    setItemEntries(saveFile, item.entries, slot);
                });
            }
        }
    };

    return (saveFile, items, firstAvailableSlot, category, func) => {
        const writeableItems = getCondensedItems(items, category);

        const slotEntries = writeableItems.map((item, slotInCategory) => {
            const slot = firstAvailableSlot + slotInCategory;
            return {
                slot: slot,
                entries: item.entries
            };
        });

        const secondaryEntries = writeableItems.map((item, slotInCategory) => {
            const slot = firstAvailableSlot + slotInCategory;
            return func(item, slot, slotInCategory);
        }).reduce((acc, next) => {
            return acc.concat(next);
        }, []);

        return batchSetItemSlots(slotEntries, saveFile).then(nextAvailableSlot => {
            return batchOffsetSetter(secondaryEntries, saveFile).then(() => {
                return nextAvailableSlot;
            });
        });
        // .then(() => {
        //     // deleteUnusedSlotsInCategory(saveFile, firstAvailableSlot, writeableItems.length, category);
        // });
    };
})();