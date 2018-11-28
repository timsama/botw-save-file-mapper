const offsetChecker = require('../lib/offset-checker.js');
const saveFileUtils = require('../util/save-file-utils.js');
const CONFIG = require('../config.json');

const offsets = process.argv.slice(2).map((a) => parseInt(a));
const saveFilepath = `${CONFIG.savepath}game_data.sav`;

offsets.forEach((offset) => {
    const value = offsetChecker(offset, saveFilepath);
    console.log(`0x${saveFileUtils.toHexString(offset)}: 0x${saveFileUtils.toHexString(value)} or ${value} in decimal.`);
});
