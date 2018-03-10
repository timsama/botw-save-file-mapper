module.exports = (() => {
    const query = require('cli-interact').getYesNo;
    const fs = require('fs');
    const saveFileUtils = require('./save-file-utils.js');
    const CONFIG = require('./config.js');
    const folderUtils = require('./folder-utils.js');
    const mapFileUtils = require('./map-file-utils.js');

    return (results, name, mightSaveAsVariableReasons, shouldRename, newName, autosave) => {
        const toHexString = saveFileUtils.toHexString;

        results.forEach((result) => {
            console.log(`Found it! 0x${toHexString(result.offset)}: ${toHexString(result.value)}`);
        });

        if (results.length > 0 && (autosave || query('Would you like to export this result?'))) {
            const saveAsVariablePrompt = mightSaveAsVariableReasons.concat('Would you like to export it as a variable value?').join(' ');
            const saveAsVariable = mightSaveAsVariableReasons.length > 0 && query(saveAsVariablePrompt);

            const finalResults = results.map((result) => {
                if (saveAsVariable) {
                    return {offset: result.offset, value: 'variable'};
                } else {
                    return result;
                }
            });

            const jsonOffsetMapFile = `${CONFIG.exportpath}offsetmap.json`;
            const jsonEffectMapFile = `${CONFIG.exportpath}effectmap.json`;

            folderUtils.buildFoldersIfTheyDoNotExist(jsonOffsetMapFile);
            folderUtils.buildFoldersIfTheyDoNotExist(jsonEffectMapFile);

            const offsetMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(jsonOffsetMapFile);
            const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(jsonEffectMapFile);

            mapFileUtils.appendOffsetEffects(offsetMap, finalResults, name);
            mapFileUtils.setValueAtKeyPath(effectMap, name.toLowerCase(), finalResults);

            mapFileUtils.saveJsonFile(jsonOffsetMapFile, offsetMap);
            mapFileUtils.saveJsonFile(jsonEffectMapFile, effectMap);
        }
    };
})();
