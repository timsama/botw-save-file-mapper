module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./save-file-utils.js');
    const saveFilename = 'game_data.sav';

    return (offset, saveFilepath) => {
        return saveFileUtils.withBinaryFileSync(saveFilepath, function (binary) {
            return saveFileUtils.buildReader('uint32', binary)(offset);
        });
    };
})();
