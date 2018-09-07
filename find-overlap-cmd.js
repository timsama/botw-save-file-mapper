const findOverlap = require('./find-overlap.js');

const CONFIG = require('./config.js');
const fs = require('fs');
const saveFileUtils = require('./util/save-file-utils.js');

const name1 = process.argv[2];
const name2 = process.argv[3];
const enforceSameValues = process.argv.slice(4).some(arg => arg == 'enforce-same-values');

const inputFilename1 = name1 + '.raw.changes';
const inputFilepath1 = CONFIG.rawchangespath + inputFilename1;
const outputFilename1 = name1 + '.filtered.raw.changes';
const outputFilepath1 = CONFIG.rawchangespath + outputFilename1;

const inputFilename2 = name2 + '.raw.changes';
const inputFilepath2 = CONFIG.rawchangespath + inputFilename2;
const outputFilename2 = name2 + '.filtered.raw.changes';
const outputFilepath2 = CONFIG.rawchangespath + outputFilename2;

const changesToUnapply1 = saveFileUtils.getChangesToUnapply(inputFilepath1);
const changesToApply1 = saveFileUtils.getChangesToApply(inputFilepath1);

const changesToUnapply2 = saveFileUtils.getChangesToUnapply(inputFilepath2);
const changesToApply2 = saveFileUtils.getChangesToApply(inputFilepath2);

const getHexLine = (change, sign) => {
    return sign + '0x' + saveFileUtils.toHexString(change.offset) + ' ' + saveFileUtils.toHexString(change.value);
};

const getPlusHexLine = change => getHexLine(change, '+');
const getMinusHexLine = change => getHexLine(change, '-');

const getOutput = (changeSet) => {
    const minusLines = changeSet.minusLines.map(getMinusHexLine);
    const plusLines = changeSet.plusLines.map(getPlusHexLine);
    return minusLines.concat(plusLines).join('\n');
};

const overlap = findOverlap(changesToUnapply1, changesToApply1, changesToUnapply2, changesToApply2, enforceSameValues);

fs.writeFileSync(outputFilepath1, getOutput(overlap.file1));
fs.writeFileSync(outputFilepath2, getOutput(overlap.file2));