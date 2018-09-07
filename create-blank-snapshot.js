const fs = require('fs');
const jBinary = require('jbinary');
const saveFileUtils = require('./util/save-file-utils.js');
const CONFIG = require('./config.js');

const createBlankSnapshot = (outFile, inFile) => {
    const outputFilename = `${CONFIG.snapshotspath}${outFile}.sav`;
    const inputFilename = `${CONFIG.savepath}game_data.sav`;

    saveFileUtils.withBinaryFileSync(inputFilename, (binary) => {
        while(binary.tell() < CONFIG.saveFileLastOffset) {
            binary.write('uint32', 0);
        }

        binary.saveAsSync(outputFilename);
    });
};

createBlankSnapshot(process.argv[2], process.argv[3]);
