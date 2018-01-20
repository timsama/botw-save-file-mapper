module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./save-file-utils.js');
    const CONFIG = require('./config.js');
    const path = CONFIG.savepath;
    const saveFilename = 'game_data.sav';
    const saveFilepath = `${path}/${saveFilename}`;
    
    return (names) => {
        jBinary.load(saveFilepath, saveFileUtils.typeSet, function (err, binary) {
            const writeToOffset = saveFileUtils.buildWriter('uint32', binary);

            names.forEach((name) => {
                const changesFilename = name + '.changes';
                const changesFilepath = `${path}changes/${changesFilename}`;

                    saveFileUtils.getChangesToUnapply(changesFilepath).forEach((entry) => {
                       writeToOffset(entry.offset, entry.value);
                    });
            });

            binary.saveAs(saveFilepath);
        });
    };
})();
