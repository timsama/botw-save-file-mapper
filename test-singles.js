const saveFileUtils = require('./save-file-utils.js');
const buildRecursiveSearcher = require('./build-recursive-searcher.js');
const resultExporter = require('./json-result-exporter.js');
const fs = require('fs');
const CONFIG = require('./config.js');
const folderUtils = require('./folder-utils.js');

const name = process.argv[2] || 'unnamed';
const changesFilename = name + '.raw.changes';
const changesFilepath = CONFIG.rawchangespath + changesFilename;
const saveFilepath = `${CONFIG.savepath}game_data.sav`;
const captionImagepath = `${CONFIG.savepath}caption.jpg`;
const tempCaptionImagepath = `${CONFIG.tempoutputpath}caption.temp.jpg`;
const onlyTestOnes = !!process.argv[3] || false;

folderUtils.buildFoldersIfTheyDoNotExist(tempCaptionImagepath);

const allChangesToApply = saveFileUtils.getChangesToApply(changesFilepath).filter((address) => {
    return !onlyTestOnes || address.value == 1;
});
const allChangesToUnapply = saveFileUtils.getChangesToUnapply(changesFilepath).filter((address) => {
    return !onlyTestOnes || allChangesToApply[i].value == 1;
});

fs.renameSync(captionImagepath, tempCaptionImagepath);
fs.copyFileSync(CONFIG.placeholderImagepath, captionImagepath);

saveFileUtils.withBinaryFileSync(saveFilepath, (binary) => {
    const recursiveSearcher = buildRecursiveSearcher(saveFilepath, binary);

    const results = recursiveSearcher.search(allChangesToApply, allChangesToUnapply, (a) => a);

    resultExporter(results, name);
});

fs.unlinkSync(captionImagepath);
fs.renameSync(tempCaptionImagepath, captionImagepath);
