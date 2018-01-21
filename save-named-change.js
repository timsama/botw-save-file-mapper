module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./save-file-utils.js');
    const CONFIG = require('./config.js');
    const mapFileUtils = require('./map-file-utils.js');
    
    const saveFilename = 'game_data.sav';
    const saveFilepath = `${CONFIG.savepath}${saveFilename}`;
    const jsonEffectMapFile = `${CONFIG.exportpath}effectmap.json`;

    return (name, offsets) => {
        jBinary.load(saveFilepath, saveFileUtils.typeSet, function (err, binary) {
            const readFromOffset = saveFileUtils.buildReader('uint32', binary);

            const entries = offsets.map((offset) => ({'offset': offset, 'value': readFromOffset(offset)}));
            
            const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(jsonEffectMapFile);
            mapFileUtils.setValueAtKeyPath(effectMap, name, entries);
            mapFileUtils.saveJsonFile(jsonEffectMapFile, effectMap);
        });
    };
})();
