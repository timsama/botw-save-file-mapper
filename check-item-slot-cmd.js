const offsetChecker = require('./offset-checker.js');
const saveFileUtils = require('./save-file-utils.js');
const CONFIG = require('./config.js');

const slot = parseInt(process.argv[2]);
const filename = !!process.argv[3] ? (CONFIG.snapshotspath + process.argv[3]) : CONFIG.savepath + 'game_data.sav';

const slotsOffset = 394248;
const slotWidth = 128;
const baseOffset = slotsOffset + (slot - 1) * slotWidth;
const relativeOffsets = [
    0,
    8,
    16,
    24
];

relativeOffsets.forEach((relativeOffset) => {
    const offset = baseOffset + relativeOffset;
    const value = offsetChecker(offset, filename);
    console.log(`0x${saveFileUtils.toHexString(offset)}: 0x${saveFileUtils.toHexString(value)} or ${value} in decimal.`);
});
