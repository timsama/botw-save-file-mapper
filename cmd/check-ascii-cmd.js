const offsetChecker = require('../lib/offset-checker.js');
const saveFileUtils = require('../util/save-file-utils.js');
const CONFIG = require('../config.json');

const offset = parseInt(process.argv[2]);
const length = parseInt(process.argv[3]);
const offsets = Array.apply(0, new Array(length)).map((e, i) => i * 8 + offset);
const saveFilepath = `${CONFIG.savepath}game_data.sav`;

const values = offsets.map((offset) => offsetChecker(offset, saveFilepath));
const hexStrings = values.map((value) => saveFileUtils.toHexString(value));
const codes = [];
hexStrings.forEach((hexString) => {
    hexString.split('').reduce((prev, next) => {
        if (prev && next) {
            codes.push(`0x${prev}${next}`);
            return undefined;
        } else {
            return next;
        }
    }, undefined)
});
const chars = codes.map((code) => String.fromCharCode(code));
console.log(chars.join(''));
