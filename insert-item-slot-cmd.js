const fs = require('fs');
const offsetChecker = require('./offset-checker.js');
const offsetSetter = require('./offset-setter.js');
const itemFileUtils = require('./item-file-utils.js');
const CONFIG = require('./config.js');
const nameGetter = require('./name-getter.js');
const objUtils = require('./obj-utils.js');
const saveFileUtils = require('./save-file-utils.js');
const getItemSlotStructure = require('./get-item-slot-structure.js');

const slot = parseInt(process.argv[3]);
const saveFile = !!process.argv[5] ? (CONFIG.snapshotspath + process.argv[3]) : CONFIG.savepath + 'game_data.sav';

const slotsOffset = 394248;
const slotWidth = 128;
const getOffset = (slot) => slotsOffset + slot * slotWidth;

const category = nameGetter.getOrUndefined(process.argv[2], 'Item category: ', 'Unnamed categories not allowed.');
const categoryFilename = itemFileUtils.getCategoryFilepath(category.toLowerCase());

if (!!categoryFilename) {
    const slotStructure = getItemSlotStructure(saveFile);

    const baseSlot = slotStructure[category].first + slot - 1;

    if (!!baseSlot) {
        const name = nameGetter.getOrUndefined(process.argv[4], 'Item name: ', 'Unnamed items not allowed.');

        if (!!name) {
            const baseOffset = getOffset(baseSlot);
            
            const json = itemFileUtils.getFileAsJsonOrEmptyJsObject(categoryFilename);

            const entries = json[name];

            var slots = 1;
            var end = false;
            while(!end) {
                const nextOffset = baseOffset + slots * slotWidth;
                end = offsetChecker(nextOffset, saveFile) == 0;
                slots++;
            }

            if (!!entries) {
            saveFileUtils.shiftData(saveFile, baseOffset, baseOffset + slotWidth, slots * slotWidth);
                entries.forEach(entry => {
                    offsetSetter(baseOffset + entry.offset, entry.value, saveFile);
                });
            } else {
                console.log(`No entries found for '${name}' in ${category}.`);
            }
        }
    }
} else {
    console.log('Category not recognized.');
}
