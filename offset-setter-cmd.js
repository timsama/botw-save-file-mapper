const offsetSetter = require('./offset-setter.js');
const saveFileUtils = require('./util/save-file-utils.js');
const CONFIG = require('./config.js');

const offset = parseInt(process.argv[2]);
const valueStr = process.argv[3];
const isValueHex = valueStr.split('').some(c => c == 'x');
const value = isValueHex ? parseInt(valueStr, 16) : parseInt(valueStr, 10);
const filename = process.argv[4];
const saveFilepath = `${CONFIG.savepath}${filename || 'game_data.sav'}`;

offsetSetter(offset, value, saveFilepath);
