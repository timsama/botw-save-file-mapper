(() => {
    const CONFIG = require('./config.js');
    const saveFileUtils = require('./save-file-utils.js');
    const folderUtils = require('./folder-utils.js');
    const mapFileUtils = require('./map-file-utils.js');

    const jsonOffsetMapFile = `${CONFIG.exportpath}offsetmap.json`;
    const jsonEffectMapFile = `${CONFIG.exportpath}effectmap.json`;

    folderUtils.buildFoldersIfTheyDoNotExist(jsonOffsetMapFile);
    folderUtils.buildFoldersIfTheyDoNotExist(jsonEffectMapFile);

    const offsetMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(jsonOffsetMapFile);
    const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(jsonEffectMapFile);

    const itemSlotsKnown = 488;
    const itemSlotsWidthBytes = 16;

    var addressesCovered = itemSlotsKnown * itemSlotsWidthBytes;
    var totalAddresses = 128400;

    const exportEffects = (effectSubmap, pathSoFar) => {
        const nonEmptyPathSoFar = pathSoFar || [];
        Object.keys(effectSubmap).forEach(key => {
            if (key == "entries") {
                effectSubmap.entries.forEach(entry => {
                    addressesCovered++;
                    offsetMap[saveFileUtils.toHexString(entry.offset)] = `Affects ${nonEmptyPathSoFar.join('.')}`;
                });
            } else if (key !== 'softdependencies' && key !== 'harddependencies' && key !== 'rewards') {
                exportEffects(effectSubmap[key], nonEmptyPathSoFar.concat(key));
            }
        });
    };

    exportEffects(effectMap);

    const percentMapped = addressesCovered / (totalAddresses * 1.0) * 100;
    console.log(`${addressesCovered} out of ${totalAddresses} addresses covered. Save file is ${percentMapped}% mapped.`)

    mapFileUtils.saveJsonFile(jsonOffsetMapFile, offsetMap);
})();
