module.exports = (() => {
    const fs = require('fs');
    const saveFileUtils = require('./save-file-utils.js');

    return (entries, saveFilepath) => {
        // we are actually using this as Async, despite the name
        return saveFileUtils.withBinaryFileSync(saveFilepath, function (binary) {
            const writer = saveFileUtils.buildWriter('uint32', binary);
            entries.forEach(entry => writer(entry.offset, entry.value));
            return binary.saveAs(saveFilepath);
        });
    };
})();
