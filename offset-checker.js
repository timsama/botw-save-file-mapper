module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./util/save-file-utils.js');

    return (offset, saveFilepath) => {
        return saveFileUtils.withBinaryFileSync(saveFilepath, function (binary) {
            return saveFileUtils.buildReader('uint32', binary)(offset);
        });
    };
})();
