var fs = require('fs');
var jBinary = require('jbinary');
var saveFileUtils = require('./save-file-utils.js');
var CONFIG = require('./config.js');

// this only works because all BoTW v1.4 save files are the same length
const buildHexDiff = (outputFilename, beforeFilename, afterFilename) => {
    const hexDiff = saveFileUtils.withBinaryFileSync(beforeFilename, (beforeBinary) => {
        return saveFileUtils.withBinaryFileSync(afterFilename, (afterBinary) => {
            const getHexLine = (offset, value) => {
                return '0x' + saveFileUtils.toHexString(offset) + ' ' + saveFileUtils.toHexString(value);
            };
            const nextBefore = () => {
                return beforeBinary.read('uint32');
            };
            const nextAfter = () => {
                return afterBinary.read('uint32');
            };

            var minusLines = [];
            var plusLines = [];

            while(beforeBinary.tell() < CONFIG.saveFileLastOffset) {
                const beforeOffset = beforeBinary.tell();
                const afterOffset = afterBinary.tell();
                const beforeValue = nextBefore();
                const afterValue = nextAfter();
                if (beforeValue !== afterValue) {
                    minusLines.push('-' + getHexLine(beforeOffset, beforeValue));
                    plusLines.push('+' + getHexLine(afterOffset, afterValue));
                }
            };
            
            return minusLines.join('\n') + '\n' + plusLines.join('\n');
        });
    });

    fs.writeFileSync(outputFilename, hexDiff);
};

module.exports = buildHexDiff;
