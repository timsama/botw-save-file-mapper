var fs = require('fs');
var jBinary = require('jbinary');
var saveFileUtils = require('./save-file-utils.js');
var CONFIG = require('./config.js');

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
