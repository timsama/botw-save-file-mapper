const fs = require('fs');
const offsetChecker = require('./offset-checker.js');
const itemFileUtils = require('./item-file-utils.js');
const CONFIG = require('./config.js');
const nameGetter = require('./name-getter.js');
const objUtils = require('./obj-utils.js');
const saveFileUtils = require('./save-file-utils.js');
const getItemSlotStructure = require('./get-item-slot-structure.js');
const slotInfo = require('./slot-info.js');

const slot = parseInt(process.argv[3]);
const saveFile = !!process.argv[5] ? (CONFIG.snapshotspath + process.argv[5]) : CONFIG.savepath + 'game_data.sav';

const category = nameGetter.getOrUndefined(process.argv[2], 'Item category: ', 'Unnamed categories not allowed.');
const categoryFilename = itemFileUtils.getCategoryFilepath(category.toLowerCase());

if (!!categoryFilename) {
    const slotStructure = getItemSlotStructure(saveFile);

    const baseSlot = slotStructure[category].first + slot - 1;
    const totalSlotsInCategory = slotStructure[category].last - slotStructure[category].first;
    const subsequentSlotsInCategory = totalSlotsInCategory - (slot - 1);

    if (!!baseSlot || baseSlot === 0) {
        const base = slotInfo.getOffsets(baseSlot, slot - 1, category);
        const next = slotInfo.getOffsets(baseSlot + 1, slot, category);

        var slots = 1;
        var end = false;
        while(!end) {
            const nextOffset = slotInfo.getOffsets(baseSlot + slots, slot - 1, category).item;
            end = offsetChecker(nextOffset, saveFile) == 0;
            slots++;
        }

        const lengths = slotInfo.getLengths(slots, subsequentSlotsInCategory);

        saveFileUtils.shiftData(saveFile, next.item, base.item, lengths.item);
        saveFileUtils.shiftData(saveFile, next.quantity, base.quantity, lengths.quantity);
        saveFileUtils.shiftData(saveFile, next.equipped, base.equipped, lengths.equipped);
        saveFileUtils.shiftData(saveFile, next.bonus.type, base.bonus.type, lengths.bonus.type);
        saveFileUtils.shiftData(saveFile, next.bonus.amount, base.bonus.amount, lengths.bonus.amount);
    }
} else {
    console.log('Category not recognized.');
}
