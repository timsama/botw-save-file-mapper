module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('../util/save-file-utils.js');
    const CONFIG = require('../config.js');
    const saveFilename = 'game_data.sav';
    const saveFilepath = `${CONFIG.savepath}${saveFilename}`;

    return (names) => {
        jBinary.load(saveFilepath, saveFileUtils.typeSet, function (err, binary) {
            const writeToOffset = saveFileUtils.buildWriter('uint32', binary);

            names.forEach((name) => {
                const changesFilename = name + '.raw.changes';
                const changesFilepath = `${CONFIG.rawchangespath}${changesFilename}`;

                    saveFileUtils.getChangesToApply(changesFilepath).forEach((entry) => {
                       writeToOffset(entry.offset, entry.value);
                    });
            });

            binary.saveAs(saveFilepath);
        });
    };
})();
