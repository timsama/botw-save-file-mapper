const saveFileUtils = require('./save-file-utils.js');
const buildRecursiveSearcher = require('./build-recursive-searcher.js');
const resultExporter = require('./result-exporter.js');
const fs = require('fs');
const CONFIG = require('./config.js');

const name = process.argv[2] || 'unnamed';
const _path = process.argv[3] || CONFIG.savepath;
const path = (_path.slice(-1) === '/') ? _path : _path + '/';
const changesFilename = name + '.raw.changes';
const changesFilepath = `${path}raw/${changesFilename}`;
const saveFilename = 'game_data.sav';
const saveFilepath = `${path}${saveFilename}`;
const captionImagepath = `${path}caption.jpg`;
const tempCaptionImagepath = `${path}caption.temp.jpg`;
const onlyTestOnes = !!process.argv[4] || false;

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
