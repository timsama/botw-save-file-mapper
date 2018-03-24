module.exports = (() => {
    const query = require('cli-interact').getYesNo;
    const fs = require('fs');
    const saveFileUtils = require('./save-file-utils.js');
    const CONFIG = require('./config.js');
    const folderUtils = require('./folder-utils.js');
    const mapFileUtils = require('./map-file-utils.js');

    return (results, name, mightSaveAsVariableReasons, shouldRename, newName, saveQueryOverride, knownDependencies, skipLogging) => {
        const toHexString = saveFileUtils.toHexString;

        !skipLogging && results.filter(a => !!a).forEach((result) => {
            console.log(`Found it! 0x${toHexString(result.offset)}: ${toHexString(result.value)}`);
        });

        const saveQuery = !!saveQueryOverride ? saveQueryOverride : () => query('Would you like to export this result?');

        if (results.length > 0 && saveQuery()) {
            const saveAsVariablePrompt = mightSaveAsVariableReasons.concat('Would you like to export it as a variable value?').join(' ');
            const saveAsVariable = mightSaveAsVariableReasons.length > 0 && query(saveAsVariablePrompt);

            const finalResult = {
                entries: results.filter(a => !!a).map((result) => {
                    if (saveAsVariable) {
                        return {offset: result.offset, value: 'variable'};
                    } else {
                        return result;
                    }
                })
            };

            if (!!knownDependencies && knownDependencies.harddependencies && knownDependencies.harddependencies.length > 0) {
                finalResult.harddependencies = knownDependencies.harddependencies;
            }

            if (!!knownDependencies && knownDependencies.softdependencies && knownDependencies.softdependencies.length > 0) {
                finalResult.softdependencies = knownDependencies.softdependencies;
            }

            const jsonOffsetMapFile = `${CONFIG.exportpath}offsetmap.json`;
            const jsonEffectMapFile = `${CONFIG.exportpath}effectmap.json`;

            folderUtils.buildFoldersIfTheyDoNotExist(jsonOffsetMapFile);
            folderUtils.buildFoldersIfTheyDoNotExist(jsonEffectMapFile);

            const offsetMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(jsonOffsetMapFile);
            const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(jsonEffectMapFile);

            mapFileUtils.appendOffsetEffects(offsetMap, finalResult.entries, name);
            mapFileUtils.setValueAtKeyPath(effectMap, name.toLowerCase(), finalResult);

            mapFileUtils.saveJsonFile(jsonOffsetMapFile, offsetMap);
            mapFileUtils.saveJsonFile(jsonEffectMapFile, effectMap);
        }
    };
})();
