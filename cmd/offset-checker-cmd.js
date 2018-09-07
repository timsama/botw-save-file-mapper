const offsetChecker = require('../lib/offset-checker.js');
const saveFileUtils = require('../util/save-file-utils.js');
const CONFIG = require('../config.js');

const offset = parseInt(process.argv[2]);
const filename = process.argv[3];
const saveFilepath = `${CONFIG.savepath}${filename || 'game_data.sav'}`;

const value = offsetChecker(offset, saveFilepath);
console.log(`0x${saveFileUtils.toHexString(offset)}: 0x${saveFileUtils.toHexString(value)} or ${value} in decimal.`);
