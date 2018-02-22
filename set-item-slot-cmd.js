const fs = require('fs');
const offsetSetter = require('./offset-setter.js');
const itemFileUtils = require('./item-file-utils.js');
const CONFIG = require('./config.js');
const nameGetter = require('./name-getter.js');
const objUtils = require('./obj-utils.js');
const getItemSlotStructure = require('./get-item-slot-structure.js');

const slot = parseInt(process.argv[3]);
const saveFile = !!process.argv[5] ? (CONFIG.snapshotspath + process.argv[5]) : CONFIG.savepath + 'game_data.sav';

const slotsOffset = 394248;
const slotWidth = 128;
const getOffset = (slot) => slotsOffset + slot * slotWidth;
const quantitiesOffset = 0x000711c8;
const quantitiesWidth = 8;
const getQuantitiesOffset = (slot) => quantitiesOffset + slot * quantitiesWidth;

const bonusTypeOffset = 0x0005dd20;
const bonusTypeWidth = 8;
const getBonusTypeOffset = (slot) => bonusTypeOffset + slot * bonusTypeWidth;

const bonusAmountOffset = 0x000c4c68;
const bonusAmountWidth = 8;
const getBonusAmountOffset = (slot) => bonusAmountOffset + slot * bonusAmountWidth;

const bonusTypes = {
    ATTACK: 0x1,
    DURABILITY: 0x2,
    CRITICAL: 0x4,
    LONGTHROW: 0x8,
    FIVESHOTS: 0x10,
    THREESHOTS: 0x20,
    QUICKSHOT: 0x40,
    SHIELDSURF: 0x80,
    SHIELDGUARD: 0x100,
    ATTACKPLUS: 0x80000001,
    DURABILITYPLUS: 0x80000002,
    CRITICALPLUS: 0x80000004,
    LONGTHROWPLUS: 0x80000008,
    FIVESHOTSPLUS: 0x80000010,
    THREESHOTSPLUS: 0x80000020,
    QUICKSHOTPLUS: 0x80000040,
    SHIELDSURFPLUS: 0x80000080,
    SHIELDGUARDPLUS: 0x80000100
};

const relativeOffsets = Array.apply(0, new Array(slotWidth / 8)).map((e, i) => i * 8);

const category = nameGetter.getOrUndefined(process.argv[2], 'Item category: ', 'Unnamed categories not allowed.');
const categoryFilename = itemFileUtils.getCategoryFilepath(category.toLowerCase());

if (!!categoryFilename) {
    const slotStructure = getItemSlotStructure(saveFile);

    const baseSlot = slotStructure[category].first + slot - 1;

    if (!!baseSlot || baseSlot === 0) {
        const nameStr = nameGetter.getOrUndefined(process.argv[4], 'Item name: ', 'Unnamed items not allowed.');

        if (!!nameStr) {
            const [nameWithBonus, quantityStr] = nameStr.split('x');
            const [name, bonusType, bonusAmount] = nameWithBonus.split('+');
            const quantity = parseInt(quantityStr);
            const baseOffset = getOffset(baseSlot);
            
            const json = itemFileUtils.getFileAsJsonOrEmptyJsObject(categoryFilename);

            const entries = json[name];

            if (!!entries) {
                entries.forEach(entry => {
                    offsetSetter(baseOffset + entry.offset, entry.value, saveFile);
                });
                if (!!quantity) {
                    offsetSetter(getQuantitiesOffset(baseSlot), quantity, saveFile);
                }
                if (!!bonusType) {
                    offsetSetter(getBonusTypeOffset(baseSlot), bonusTypes[bonusType.toUpperCase()], saveFile);
                    offsetSetter(getBonusAmountOffset(baseSlot), bonusAmount || 0, saveFile);
                }
            } else {
                console.log(`No entries found for '${name}' in ${category}.`);
            }
        }
    }
} else {
    console.log('Category not recognized.');
}
