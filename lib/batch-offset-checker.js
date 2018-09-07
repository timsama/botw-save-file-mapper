module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('../util/save-file-utils.js');

    return (offsets, saveFilepath) => {
        return saveFileUtils.withBinaryFileSync(saveFilepath, function (binary) {
            const reader = saveFileUtils.buildReader('uint32', binary);
            return offsets.map(offset => {
                return {
                    offset: offset,
                    value: reader(offset)
                };
            });
        });
    };
})();
