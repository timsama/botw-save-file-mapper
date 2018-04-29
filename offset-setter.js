module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./save-file-utils.js');

    return (offset, value, saveFilepath) => {
        return saveFileUtils.withBinaryFileSync(saveFilepath, function (binary) {
            saveFileUtils.buildWriter('uint32', binary)(offset, value);
            binary.saveAsSync(saveFilepath);
        });
    };
})();
