module.exports = (saveFileOverride) => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./save-file-utils.js');
    const CONFIG = require('./config.js');
    const mapFileUtils = require('./map-file-utils.js');
    
    const saveFilename = 'game_data.sav';
    const saveFilepath = saveFileOverride || `${CONFIG.savepath}${saveFilename}`;

    return (filepath, name, offsets) => {
        saveFileUtils.withBinaryFileSync(saveFilepath, (binary) => {
            const readFromOffset = saveFileUtils.buildReader('uint32', binary);

            const entries = offsets.map((offset) => ({'offset': offset, 'value': readFromOffset(offset)}));

            const result = {
                entries: entries
            };
            
            const mapJson = mapFileUtils.getFileAsJsonOrEmptyJsObject(filepath);
            mapFileUtils.setValueAtKeyPath(mapJson, name, result);
            mapFileUtils.saveJsonFile(filepath, mapJson);
        });
    };
};
