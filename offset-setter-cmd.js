const offsetChecker = require('./offset-setter.js');
const saveFileUtils = require('./save-file-utils.js');
const CONFIG = require('./config.js');

const offset = parseInt(process.argv[2]);
const value = process.argv[3];
const filename = process.argv[4];
const saveFilepath = `${CONFIG.savepath}${filename || 'game_data.sav'}`;

offsetChecker(offset, value, saveFilepath);
