module.exports = (() => {
    const Offsets = require('./offsets.js');
    const BatchOffsetSetter = require('./batch-offset-setter.js');
    const relativeOffsets = Array.apply(0, new Array(Offsets.slotWidth / 8)).map((e, i) => i * 8);

    return (saveFile, entries, slot) => {
        const baseOffset = Offsets.getItemOffset(slot);

        const zeroFilledEntries = relativeOffsets.map((relativeOffset) => {
            return {
                offset: relativeOffset,
                value: 0
            };
        });

        const combinedEntries = zeroFilledEntries.map((e, i) => entries[i] || e);
        const writeableEntries = combinedEntries.map(entry => {
            return {
                offset: baseOffset + entry.offset,
                value: entry.value
            };
        });

        BatchOffsetSetter(writeableEntries, saveFile);
    };
})();