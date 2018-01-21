const saveFileUtils = require('./save-file-utils.js');
const buildRecursiveSearcher = require('./build-recursive-searcher.js');
const resultExporter = require('./result-exporter.js');
const fs = require('fs');
const CONFIG = require('./config.js');

const name = process.argv[2] || 'unnamed';
const changesFilename = name + '.raw.changes';
const changesFilepath = CONFIG.rawchangespath + changesFilename;
const saveFilepath = `${CONFIG.savepath}game_data.sav`;
const captionImagepath = `${CONFIG.savepath}caption.jpg`;
const tempCaptionImagepath = `${CONFIG.tempoutputpath}caption.temp.jpg`;

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
