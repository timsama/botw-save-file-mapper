const saveFileUtils = require('./save-file-utils.js');
const buildRecursiveSearcher = require('./build-recursive-searcher.js');
const resultExporter = require('./json-result-exporter.js');
const fs = require('fs');
const CONFIG = require('./config.js');
const folderUtils = require('./folder-utils.js');
const mapFileUtils = require('./map-file-utils.js');
const readline = require('readline-sync');


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

const renameArgs = args.filter((arg) => arg.indexOf('rename') !== -1);
const shouldRename = renameArgs.length > 0;
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

const knownPreviousValueArgs = args.filter((arg) => arg.indexOf('known-previous-value=') !== -1);
const findKnownPreviousValue = knownPreviousValueArgs.length > 0;
const knownPreviousValue = (() =>{
    if (findKnownPreviousValue) {
        return parseInt(knownPreviousValueArgs[0].split('=').slice(-1)[0]);
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

const allUnapplyChanges = saveFileUtils.getChangesToUnapply(changesFilepath);
const allChangesToApply = saveFileUtils.getChangesToApply(changesFilepath).filter((address, i) => {
    return (!findKnownValue || address.value == knownValue) && (!findKnownPreviousValue || allUnapplyChanges[i].value == knownPreviousValue);
}).filter(offsetFilter);
const allChangesToUnapply = saveFileUtils.getChangesToUnapply(changesFilepath).filter((address, i) => {
    return (!findKnownValue || allChangesToApply[i] && allChangesToApply[i].value == knownValue) && (!findKnownPreviousValue || address.value == knownPreviousValue);
}).filter(offsetFilter);

if (allChangesToApply.length > 0 && allChangesToUnapply.length > 0) {
    fs.renameSync(captionImagepath, tempCaptionImagepath);
    fs.copyFileSync(CONFIG.placeholderImagepath, captionImagepath);

    saveFileUtils.withBinaryFileSync(saveFilepath, (binary) => {
        const recursiveSearcher = buildRecursiveSearcher(saveFilepath, binary);

        const results = recursiveSearcher.search(allChangesToApply, allChangesToUnapply, (a) => a);

        const mightSaveAsVariableReasons = [];
        if (findKnownValue || findKnownPreviousValue) {
            mightSaveAsVariableReasons.push('You searched for a known value.');
        }

        resultExporter(results, newName || name, mightSaveAsVariableReasons);
    });

    fs.unlinkSync(captionImagepath);
    fs.renameSync(tempCaptionImagepath, captionImagepath);
} else {
    console.log('No testable changes available with your current filter settings.');
}
