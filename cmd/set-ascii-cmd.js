const offsetSetter = require('../lib/offset-setter.js');
const saveFileUtils = require('../util/save-file-utils.js');
const CONFIG = require('../config.json');

const offset = parseInt(process.argv[2]);
const words = parseInt(process.argv[3]);
const text = process.argv[4];
const offsets = Array.apply(0, new Array(words)).map((e, i) => i * 8 + offset);
const codes = text.split('').map((char) => {
    const code = char.charCodeAt(0);
    const hexCode = code.toString(16);
    return hexCode;
});
const saveFilepath = `${CONFIG.savepath}game_data.sav`;

const entries = [];
const remainder = codes.reduce((acc, next) => {
    if (acc.length === 6) {
        const entry = acc + next;
        entries.push(entry);
        return '';
    } else {
        return acc + next;
    }
}, '');
if (remainder.length > 0) {
    const padCount = 8 - remainder.length;
    const pad = new Array(padCount + 1).join('0');
    const entry = remainder + pad;
    entries.push(entry);
}

// ensure offsets are clean in case the new string is shorter than the previous one
offsets.forEach((offset) => offsetSetter(offset, 0, saveFilepath));

entries.forEach((entry, i) => {
    const offset = offsets[i];
    offsetSetter(offset, parseInt(entry, 16), saveFilepath);
});
