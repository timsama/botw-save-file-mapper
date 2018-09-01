module.exports = (() => {
    const fs = require('fs');
    const jBinary = require('jbinary');
    const saveFileUtils = require('./save-file-utils.js');

    return (offsetSlots, saveFilepath) => {
        return saveFileUtils.withBinaryFileSync(saveFilepath, function (binary) {
            const reader = saveFileUtils.buildReader('uint32', binary);
            return offsetSlots.map(offsetSlot => {
                return {
                    slot: offsetSlot,
                    entries: offsetSlot.offsets.map(offset => {
                        return {
                            offset: offset,
                            value: reader(offset)
                        };
                    })
                };
            });
        });
    };
})();
