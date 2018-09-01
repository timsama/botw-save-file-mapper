module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./save-file-utils.js');

    return (entries, saveFilepath) => {
        return saveFileUtils.withBinaryFileSync(saveFilepath, function (binary) {
            const writer = saveFileUtils.buildWriter('uint32', binary);
            entries.forEach(entry => writer(entry.offset, entry.value));
            binary.saveAsSync(saveFilepath);
        });
    };
})();
