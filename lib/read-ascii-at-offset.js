module.exports = (saveFileOverride, readAtOffset) => {
    const offsetChecker = readAtOffset || require('../lib/offset-checker.js');
    const saveFileUtils = require('../util/save-file-utils.js');
    const CONFIG = require('../config.json');
    const saveFilename = 'game_data.sav';
    const saveFilepath = saveFileOverride || `${CONFIG.savepath}${saveFilename}`;

    const readAscii = (offset, lengthInChars) => {
        const length = Math.ceil(lengthInChars / 4.0);
        const offsets = Array.apply(0, new Array(length)).map((e, i) => i * 8 + offset);

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
        const chars = codes.map((code) => String.fromCharCode(code)).filter((char) => char !== '\u0000');
        return chars.join('').slice(0, lengthInChars).trim();
    };

    return readAscii;
};
