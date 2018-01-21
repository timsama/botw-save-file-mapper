const saveFileUtils = require('./save-file-utils.js');
const buildRecursiveSearcher = require('./build-recursive-searcher.js');
const resultExporter = require('./json-result-exporter.js');
const fs = require('fs');
const CONFIG = require('./config.js');
const folderUtils = require('./folder-utils.js');
const mapFileUtils = require('./map-file-utils.js');

const name = process.argv[2] || 'unnamed';
const changesFilename = name + '.raw.changes';
const changesFilepath = CONFIG.rawchangespath + changesFilename;
const saveFilepath = `${CONFIG.savepath}game_data.sav`;
const captionImagepath = `${CONFIG.savepath}caption.jpg`;
const tempCaptionImagepath = `${CONFIG.tempoutputpath}caption.temp.jpg`;
const args = process.argv.slice(3);
const filterKnownOffsets = args.indexOf('filter-known-offsets') !== -1 || args.indexOf('filter-known') !== -1;
const onlyTestOnes = args.indexOf('only-ones') !== -1 || args.indexOf('only-test-ones') !== -1 ;
const knownValueArgs = args.filter((arg) => arg.indexOf('known-value=') !== -1);
const findKnownValue = knownValueArgs.length > 0;
const knownValue = (() =>{
    if (findKnownValue) {
        return parseInt(knownValueArgs[0].split('=').slice(-1)[0]);
    } else if (onlyTestOnes) {
        return 1;
    }
})();

folderUtils.buildFoldersIfTheyDoNotExist(tempCaptionImagepath);

const offsetFilter = (() => {
    if (filterKnownOffsets) {
        return mapFileUtils.getKnownOffsetsFilter();
    } else {
        return () => true;
    }
})();

const allChangesToApply = saveFileUtils.getChangesToApply(changesFilepath).filter((address) => {
    return !findKnownValue || address.value == knownValue;
}).filter(offsetFilter);
const allChangesToUnapply = saveFileUtils.getChangesToUnapply(changesFilepath).filter((address, i) => {
    return !findKnownValue || allChangesToApply[i] && allChangesToApply[i].value == knownValue;
}).filter(offsetFilter);

if (allChangesToApply.length > 0 && allChangesToUnapply.length > 0) {
    fs.renameSync(captionImagepath, tempCaptionImagepath);
    fs.copyFileSync(CONFIG.placeholderImagepath, captionImagepath);

    saveFileUtils.withBinaryFileSync(saveFilepath, (binary) => {
        const recursiveSearcher = buildRecursiveSearcher(saveFilepath, binary);

        const results = recursiveSearcher.search(allChangesToApply, allChangesToUnapply, (a) => a);

        const mightSaveAsVariableReasons = [];
        if (findKnownValue) {
            mightSaveAsVariableReasons.push('You searched for a known value.');
        }

        resultExporter(results, name, mightSaveAsVariableReasons);
    });

    fs.unlinkSync(captionImagepath);
    fs.renameSync(tempCaptionImagepath, captionImagepath);
} else {
    console.log('No testable changes available with your current filter settings.');
}
