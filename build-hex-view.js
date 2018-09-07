const fs = require('fs');
const jBinary = require('jbinary');
const saveFileUtils = require('./util/save-file-utils.js');
const CONFIG = require('./config.js');

const buildHexView = (filename) => {
    const hexView = saveFileUtils.withBinaryFileSync(filename, (binary) => {
        const getNextHexLine = () => {
            return '0x' + saveFileUtils.toHexString(binary.tell()) + ' ' + saveFileUtils.toHexString(binary.read('uint32'));
        };

        var hexLines = [];

        while(binary.tell() < CONFIG.saveFileLastOffset) {
            hexLines.push(getNextHexLine());
        };
        
        return hexLines.join('\n');
    });

    fs.writeFileSync(`${filename}.hexview`, hexView);
};

module.exports = buildHexView;
