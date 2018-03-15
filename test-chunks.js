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
const includeKnownOffsets = args.indexOf('include-known-offsets') !== -1 || args.indexOf('include-known') !== -1;
const renameArgs = args.filter((arg) => arg.indexOf('rename') !== -1);
const shouldRename = renameArgs.length > 0;

folderUtils.buildFoldersIfTheyDoNotExist(tempCaptionImagepath);

const offsetFilter = (() => {
    if (!includeKnownOffsets) {
        return mapFileUtils.getKnownOffsetsFilter();
    } else {
        return () => true;
    }
})();

const newName = (() => {
    if (shouldRename) {
        const argInput = renameArgs[0].split('=')[1];
        if (argInput) {
            return argInput;
        } else {
            return readline.question('What should the new name be? ');
        }
    }
})();

const unchunkedChanges = saveFileUtils.getChangesToApply(changesFilepath).filter(offsetFilter);
const allChunksToApply = saveFileUtils.getChunksFromChanges(unchunkedChanges);
const allChangesToUnapply = saveFileUtils.getChangesToUnapply(changesFilepath).filter(offsetFilter);

if (allChunksToApply.length > 0 && allChangesToUnapply.length > 0) {
    fs.renameSync(captionImagepath, tempCaptionImagepath);
    fs.copyFileSync(CONFIG.placeholderImagepath, captionImagepath);

    saveFileUtils.withBinaryFileSync(saveFilepath, (binary) => {
        const recursiveSearcher = buildRecursiveSearcher(saveFilepath, binary);
        
        const getChanges = (chunks) => {
            return saveFileUtils.getChangesFromChunks(chunks);
        };

        const results = recursiveSearcher.search(allChunksToApply, allChangesToUnapply, getChanges);

        const mightSaveAsVariableReasons = [];

        resultExporter(results, newName || name, mightSaveAsVariableReasons);
    });

    fs.unlinkSync(captionImagepath);
    fs.renameSync(tempCaptionImagepath, captionImagepath);
} else {
    console.log('No testable changes available with your current filter settings.');
}
