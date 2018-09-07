const fs = require('fs');
const offsetChecker = require('../lib/offset-checker.js');
const offsetSetter = require('../lib/offset-setter.js');
const itemFileUtils = require('../util/item-file-utils.js');
const CONFIG = require('../config.js');
const nameGetter = require('../lib/name-getter.js');
const objUtils = require('../util/obj-utils.js');
const saveFileUtils = require('../util/save-file-utils.js');
const getItemSlotStructure = require('../lib/get-item-slot-structure.js');
const slotInfo = require('../lib/slot-info.js');

const slot = parseInt(process.argv[3]);
const saveFile = !!process.argv[5] ? (CONFIG.snapshotspath + process.argv[5]) : CONFIG.savepath + 'game_data.sav';

const category = nameGetter.getOrUndefined(process.argv[2], 'Item category: ', 'Unnamed categories not allowed.');
const categoryFilename = itemFileUtils.getCategoryFilepath(category.toLowerCase());

const armorTypes = {
    1633943552: 'HAT',
    1885696512: 'SHIRT',
    2003137024: 'PANTS'
};

if (!!categoryFilename) {
    const slotStructure = getItemSlotStructure(saveFile);

    let slots = [];
    for(let i = slotStructure[category].first; i <= slotStructure[category].last; i++) {
        slots.push(i);
    }

    const baseSlot = slotStructure[category].first + slot - 1;
    const offsets = slotInfo.getOffsets(baseSlot);

    if (category !== 'armor') {
        slots.forEach(slot => {
            const offset = slotInfo.getOffsets(slot).equipped;
            offsetSetter(offset, 0, saveFile);
        });
    } else {
        const armorOffset = offsets.item + 24;
        const armorType = armorTypes[offsetChecker(armorOffset, saveFile)];
        slots.forEach(slot => {
            const offsets = slotInfo.getOffsets(slot);
            const type = offsetChecker(offsets.item + 24, saveFile);
            if (armorTypes[type] === armorType) {
                offsetSetter(offsets.equipped, 0, saveFile);
            }
        });
    }
    const equippedOffset = offsets.equipped;
    offsetSetter(equippedOffset, 1, saveFile);
} else {
    console.log('Category not recognized.');
}
