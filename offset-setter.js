module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./save-file-utils.js');
    const saveFilename = 'game_data.sav';

    return (offset, value, saveFilepath) => {
        return saveFileUtils.withBinaryFileSync(saveFilepath, function (binary) {
            saveFileUtils.buildWriter('uint32', binary)(offset, value);
            binary.saveAsSync(saveFilepath);
        });
    };
})();
