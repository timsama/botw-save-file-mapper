const offsetChecker = require('./offset-checker.js');
const saveFileUtils = require('./util/save-file-utils.js');
const CONFIG = require('./config.js');
const itemFileUtils = require('./util/item-file-utils.js');

const itemFiles = itemFileUtils.validCategories.map(itemFileUtils.getCategoryFilepath);

const slot = parseInt(process.argv[2]);
const filename = !!process.argv[3] ? (CONFIG.snapshotspath + process.argv[3]) : CONFIG.savepath + 'game_data.sav';

const slotsOffset = 394248;
const slotWidth = 128;
const baseOffset = slotsOffset + (slot - 1) * slotWidth;
const relativeOffsets = Array.apply(0, new Array(slotWidth / 8)).map((e, i) => i * 8);

const entries = relativeOffsets.map((relativeOffset) => {
    const offset = baseOffset + relativeOffset;
    const value = offsetChecker(offset, filename);
    return {offset: relativeOffset, value: value};
}).filter((entry, i) => {
    return entry.value !== 0;
});

entries.forEach((entry) => {
    console.log(`0x${saveFileUtils.toHexString(entry.offset + baseOffset)}: 0x${saveFileUtils.toHexString(entry.value)} or ${entry.value} in decimal.`);
});

itemFiles.some((itemFile) => {
    const json = itemFileUtils.getFileAsJsonOrEmptyJsObject(itemFile);

    const itemKeys = Object.keys(json);
    return itemKeys.some((itemKey) => {
        const isMatch = json[itemKey].every((itemEntry, i) => {
            return itemEntry.offset === entries[i].offset
                && itemEntry.value === entries[i].value;
        });

        if (isMatch) {
            console.log(`It's a(n) ${itemKey}!`)
        }

        return isMatch;
    });
});
