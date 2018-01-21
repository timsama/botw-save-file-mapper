module.exports = (() => {
    const fs = require('fs');
    const saveFileUtils = require('./save-file-utils.js');
    const CONFIG = require('./config.js');
    const mapFileUtils = require('./map-file-utils.js');
    
    const saveFilename = 'game_data.sav';
    const saveFilepath = `${CONFIG.savepath}${saveFilename}`;
    const jsonOffsetMapFile = `${CONFIG.exportpath}offsetmap.json`;
    const jsonEffectMapFile = `${CONFIG.exportpath}effectmap.json`;

    return (names) => {
        const offsetMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(jsonOffsetMapFile);
        const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(jsonEffectMapFile);
        
        names.forEach((name) => {
            const lowercaseName = name.toLowerCase();
            const changesFilename = name + '.changes';
            const changesFilepath = `${CONFIG.filemapspath}${changesFilename}`;

            const entries = saveFileUtils.getChangesToApply(changesFilepath);

            mapFileUtils.appendOffsetEffects(offsetMap, entries, name);
            mapFileUtils.setValueAtKeyPath(effectMap, lowercaseName, entries);
        });

        mapFileUtils.saveJsonFile(jsonOffsetMapFile, offsetMap);
        mapFileUtils.saveJsonFile(jsonEffectMapFile, effectMap);
    };
})();
