const fs = require('fs');
const offsetChecker = require('./offset-checker.js');
const offsetSetter = require('./offset-setter.js');
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

    let slots = [];
    for(let i = slotStructure[category].first; i <= slotStructure[category].last; i++) {
        slots.push(i);
    }

    // this is wrong for armor, but we'll have to fix it later
    slots.forEach(slot => {
        const offset = slotInfo.getOffsets(slot).equipped;
        offsetSetter(offset, 0, saveFile);
    });

    const baseSlot = slotStructure[category].first + slot - 1;
    
    const offset = slotInfo.getOffsets(baseSlot).equipped;
    offsetSetter(offset, 1, saveFile);
} else {
    console.log('Category not recognized.');
}
