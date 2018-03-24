const offsetChecker = require('./offset-checker.js');
const saveFileUtils = require('./save-file-utils.js');
const CONFIG = require('./config.js');
const itemFileUtils = require('./item-file-utils.js');

const itemFiles = itemFileUtils.validCategories.map(itemFileUtils.getCategoryFilepath);

const filename = !!process.argv[3] ? (CONFIG.snapshotspath + process.argv[3]) : CONFIG.savepath + 'game_data.sav';

const equippedSlotsOffset = 0x00080d70;
const equippedSlotsWidth = 8;
const getEquippedSlotOffset = (slot) => equippedSlotsOffset + slot * equippedSlotsWidth;

const slotsOffset = 394248;
const slotWidth = 128;
const quantitiesOffset = 0x000711c8;
const quantitiesWidth = 8;
const relativeOffsets = Array.apply(0, new Array(slotWidth / 8)).map((e, i) => i * 8);

const weaponSlots = offsetChecker(0x00085048, filename);
const shieldSlots = offsetChecker(0x00048cd8, filename);
const bowSlots = offsetChecker(0x000e3348, filename);

const quantityTypes = {
    1098018159: 'unknown (armor)',
    1466261872: 'durability',
}

const bonusTypeOffset = 0x0005dd20;
const bonusTypeWidth = 8;
const getBonusTypeOffset = (slot) => bonusTypeOffset + slot * bonusTypeWidth;

const bonusAmountOffset = 0x000c4c68;
const bonusAmountWidth = 8;
const getBonusAmountOffset = (slot) => bonusAmountOffset + slot * bonusAmountWidth;

const bonusTypes = {
    0x1: ' with attack +',
    0x2: ' with durability +',
    0x4: ' with critical +',
    0x8: ' with long throw +',
    0x10: ' with x5 shots +',
    0x20: ' with x3 shots +',
    0x40: ' with quick-shot +',
    0x80: ' with shield surf +',
    0x100: ' with shield guard +',
    0x80000001: ' with attack (plus) +',
    0x80000002: ' with durability (plus) +',
    0x80000004: ' with critical (plus) +',
    0x80000008: ' with long throw (plus) +',
    0x80000010: ' with x5 shots (plus) +',
    0x80000020: ' with x3 shots (plus) +',
    0x80000040: ' with quick-shot (plus) +',
    0x80000080: ' with shield surf (plus) +',
    0x80000100: ' with shield guard (plus) +'
};

var slot = 1;
var end = false;
while(!end) {
    const baseOffset = slotsOffset + (slot - 1) * slotWidth;
    const isEquippedOffset = getEquippedSlotOffset(slot - 1);
    const isEquipped = offsetChecker(isEquippedOffset, filename);
    const isEquippedStr = isEquipped ? ' [equipped]' : '';

    const entries = relativeOffsets.map((relativeOffset) => {
    const offset = baseOffset + relativeOffset;
    const value = offsetChecker(offset, filename);
        return {offset: relativeOffset, value: value};
    }).filter((entry, i) => {
        return i < 4 || entry.value !== 0;
    });

    const quantityOffset = quantitiesOffset + quantitiesWidth * (slot - 1);
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

    const bonusType = offsetChecker(getBonusTypeOffset(slot - 1), filename);
    const bonusAmount = offsetChecker(getBonusAmountOffset(slot - 1), filename);
    const bonusString = (() => {
        if (!bonusType) {
            return '';
        } else {
            return bonusTypes[bonusType] + bonusAmount;
        }
    })();

    const matchFound = itemFiles.some((itemFile) => {
        const json = itemFileUtils.getFileAsJsonOrEmptyJsObject(itemFile);

        const itemKeys = json.getSortedKeys();
        return itemKeys.some((itemKey) => {
            const isMatch = json[itemKey].every((itemEntry, i) => {
                return itemEntry.offset === entries[i].offset
                    && itemEntry.value === entries[i].value;
            });

            if (isMatch) {
                console.log(`Slot ${slot}: It's a(n) ${itemKey}!${quantityString}${bonusString}${isEquippedStr}`);
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
var totalSlots = slot + 1;
end = false;
while(!end) {
    const nextOffset = slotsOffset + totalSlots * slotWidth;
    end = offsetChecker(nextOffset, filename) != 0;
    totalSlots++;
}
console.log(totalSlots);

