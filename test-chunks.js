var saveFileUtils = require('./save-file-utils.js');
var buildRecursiveSearcher = require('./build-recursive-searcher.js');
var resultExporter = require('./result-exporter.js');
var fs = require('fs');
var CONFIG = require('./config.js');

const name = process.argv[2] || 'unnamed';
const _path = process.argv[3] || CONFIG.savepath;
const path = (_path.slice(-1) === '/') ? _path : _path + '/';
const changesFilename = name + '.raw.changes';
const changesFilepath = `${path}raw/${changesFilename}`;
const saveFilename = 'game_data.sav';
const saveFilepath = `${path}${saveFilename}`;
const captionImagepath = `${path}caption.jpg`;
const tempCaptionImagepath = `${path}caption.temp.jpg`;

const allChunksToApply = saveFileUtils.getChunksToApply(changesFilepath);
const allChangesToUnapply = saveFileUtils.getChangesToUnapply(changesFilepath);

fs.renameSync(captionImagepath, tempCaptionImagepath);
fs.copyFileSync(CONFIG.placeholderImagepath, captionImagepath);

saveFileUtils.withBinaryFileSync(saveFilepath, (binary) => {
    const recursiveSearcher = buildRecursiveSearcher(saveFilepath, binary);
    
    const getChanges = (chunks) => {
        return saveFileUtils.getChangesFromChunks(chunks);
    };

    const results = recursiveSearcher.search(allChunksToApply, allChangesToUnapply, getChanges);

    resultExporter(results, name);
});

fs.unlinkSync(captionImagepath);
fs.renameSync(tempCaptionImagepath, captionImagepath);
