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

folderUtils.buildFoldersIfTheyDoNotExist(tempCaptionImagepath);

const offsetFilter = (() => {
    if (filterKnownOffsets) {
        return mapFileUtils.getKnownOffsetsFilter();
    } else {
        return () => true;
    }
})();

const allChangesToApply = saveFileUtils.getChangesToApply(changesFilepath).filter((address) => {
    return !onlyTestOnes || address.value == 1;
}).filter(offsetFilter);
const allChangesToUnapply = saveFileUtils.getChangesToUnapply(changesFilepath).filter((address, i) => {
    return !onlyTestOnes || allChangesToApply[i] && allChangesToApply[i].value == 1;
}).filter(offsetFilter);

if (allChangesToApply.length > 0 && allChangesToUnapply.length > 0) {
    fs.renameSync(captionImagepath, tempCaptionImagepath);
    fs.copyFileSync(CONFIG.placeholderImagepath, captionImagepath);

    saveFileUtils.withBinaryFileSync(saveFilepath, (binary) => {
        const recursiveSearcher = buildRecursiveSearcher(saveFilepath, binary);

        const results = recursiveSearcher.search(allChangesToApply, allChangesToUnapply, (a) => a);

        resultExporter(results, name);
    });

    fs.unlinkSync(captionImagepath);
    fs.renameSync(tempCaptionImagepath, captionImagepath);
} else {
    console.log('No testable changes available with your current filter settings.');
}
