const offsetChecker = require('./offset-checker.js');
const saveFileUtils = require('./save-file-utils.js');

const offset = parseInt(process.argv[2], 16);
const filename = process.argv[3];

console.log(`0x${saveFileUtils.toHexString(offset)}: ${saveFileUtils.toHexString(offsetChecker(offset, filename))}`);
