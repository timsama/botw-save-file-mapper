const fs = require('fs');
const jBinary = require('jbinary');
const saveFileUtils = require('../util/save-file-utils.js');
const CONFIG = require('../config.json');

const createBlankSnapshot = (outFile) => {
    const outputFilename = `${CONFIG.snapshotspath}${outFile}.sav`;
    const inputFilename = `${CONFIG.blankpath}blank.sav`;

    fs.copyFileSync(inputFilename, outputFilename);

    saveFileUtils.withBinaryFileSync(inputFilename, (binary) => {
        while(binary.tell() < CONFIG.saveFileLastOffset) {
            binary.write('uint32', 0);
        }

        binary.saveAsSync(outputFilename);
    });
};

createBlankSnapshot(process.argv[2] || 'blank');
