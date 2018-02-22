const fs = require('fs');
const offsetChecker = require('./offset-checker.js');
const itemFileUtils = require('./item-file-utils.js');
const CONFIG = require('./config.js');
const nameGetter = require('./name-getter.js');
const objUtils = require('./obj-utils.js');
const saveFileUtils = require('./save-file-utils.js');
const getItemSlotStructure = require('./get-item-slot-structure.js');

const slot = parseInt(process.argv[3]);
const saveFile = !!process.argv[5] ? (CONFIG.snapshotspath + process.argv[5]) : CONFIG.savepath + 'game_data.sav';

const slotsOffset = 394248;
const slotWidth = 128;
const getOffset = (slot) => slotsOffset + slot * slotWidth;
const quantitiesOffset = 0x000711c8;
const quantitiesWidth = 8;
const getQuantitiesOffset = (slot) => quantitiesOffset + slot * quantitiesWidth;
const relativeOffsets = Array.apply(0, new Array(slotWidth / 8)).map((e, i) => i * 8);

const category = nameGetter.getOrUndefined(process.argv[2], 'Item category: ', 'Unnamed categories not allowed.');
const categoryFilename = itemFileUtils.getCategoryFilepath(category.toLowerCase());

if (!!categoryFilename) {
    const slotStructure = getItemSlotStructure(saveFile);

    const baseSlot = slotStructure[category].first + slot - 1;

    if (!!baseSlot || baseSlot === 0) {
        const baseOffset = getOffset(baseSlot);

        var slots = 1;
        var end = false;
        while(!end) {
            const nextOffset = baseOffset + slots * slotWidth;
            end = offsetChecker(nextOffset, saveFile) == 0;
            slots++;
        }

        saveFileUtils.shiftData(saveFile, baseOffset + slotWidth, baseOffset, slots * slotWidth);
        saveFileUtils.shiftData(saveFile, quantitiesOffset + quantitiesWidth, quantitiesOffset, slots * quantitiesWidth);
    }
} else {
    console.log('Category not recognized.');
}
