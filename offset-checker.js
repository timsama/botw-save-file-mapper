module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./save-file-utils.js');
    const CONFIG = require('./config.js');
    const saveFilename = 'game_data.sav';

    return (offset, filename) => {
        const saveFilepath = `${CONFIG.savepath}/${filename || saveFilename}`;
        return saveFileUtils.withBinaryFileSync(saveFilepath, function (binary) {
            return saveFileUtils.buildReader('uint32', binary)(offset);
        });
    };
})();
