const offsetChecker = require('./offset-checker.js');
const saveFileUtils = require('./save-file-utils.js');
const CONFIG = require('./config.js');
const itemFileUtils = require('./item-file-utils.js');

const itemFiles = itemFileUtils.validCategories.map(itemFileUtils.getCategoryFilepath);

const filename = !!process.argv[3] ? (CONFIG.snapshotspath + process.argv[3]) : CONFIG.savepath + 'game_data.sav';

const slotsOffset = 394248;
const slotWidth = 128;
const quantitiesOffset = 0x000711c0;
const quantitiesWidth = 8;
const relativeOffsets = Array.apply(0, new Array(slotWidth / 8)).map((e, i) => i * 8);

const weaponSlots = offsetChecker(0x00085048, filename);
const shieldSlots = offsetChecker(0x00048cd8, filename);
const bowSlots = offsetChecker(0x000e3348, filename);

const quantityTypes = {
    1098018159: 'unknown (armor)',
    1466261872: 'durability',
}

var slot = 1;
var end = false;
while(!end) {
    const baseOffset = slotsOffset + (slot - 1) * slotWidth;

    const entries = relativeOffsets.map((relativeOffset) => {
    const offset = baseOffset + relativeOffset;
    const value = offsetChecker(offset, filename);
        return {offset: relativeOffset, value: value};
    }).filter((entry, i) => {
        return i < 4 || entry.value !== 0;
    });

    const quantityOffset = quantitiesOffset + quantitiesWidth * slot;
    const quantity = offsetChecker(quantityOffset, filename);
    const quantityString = (() => {
        if (!quantity) {
            return '';
        } else {
            const quantityType = quantityTypes[entries[0].value];
            if (!!quantityType) {
                return ` ${quantity} ${quantityType}`;
            } else {
                return ` x${quantity}`;
            }
        }
    })();

    const matchFound = itemFiles.some((itemFile) => {
        const json = itemFileUtils.getFileAsJsonOrEmptyJsObject(itemFile);

        const itemKeys = Object.keys(json);
        return itemKeys.some((itemKey) => {
            const isMatch = json[itemKey].every((itemEntry, i) => {
                return itemEntry.offset === entries[i].offset
                    && itemEntry.value === entries[i].value;
            });

            if (isMatch) {
                console.log(`Slot ${slot}: It's a(n) ${itemKey}!${quantityString}`);
            }

            return isMatch;
        });
    });

    if (!matchFound) {
        console.log(`Unknown item in slot ${slot}`);
        entries.forEach((entry) => {
            console.log(`0x${saveFileUtils.toHexString(entry.offset + baseOffset)}: 0x${saveFileUtils.toHexString(entry.value)} or ${entry.value} in decimal.`);
        });
    }
    
    const nextOffset = slotsOffset + slot * slotWidth;
    end = offsetChecker(nextOffset, filename) == 0;
    slot++;
}
