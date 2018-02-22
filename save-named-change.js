module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./save-file-utils.js');
    const CONFIG = require('./config.js');
    const mapFileUtils = require('./map-file-utils.js');
    
    const saveFilename = 'game_data.sav';
    const saveFilepath = `${CONFIG.savepath}${saveFilename}`;

    return (filepath, name, offsets) => {
        jBinary.load(saveFilepath, saveFileUtils.typeSet, function (err, binary) {
            const readFromOffset = saveFileUtils.buildReader('uint32', binary);

            const entries = offsets.map((offset) => ({'offset': offset, 'value': readFromOffset(offset)}));
            
            const mapJson = mapFileUtils.getFileAsJsonOrEmptyJsObject(filepath);
            mapFileUtils.setValueAtKeyPath(mapJson, name, entries);
            mapFileUtils.saveJsonFile(filepath, mapJson);
        });
    };
})();
