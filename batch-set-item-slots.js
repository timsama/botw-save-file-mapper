module.exports = (() => {
    const Offsets = require('./offsets.js');
    const BatchOffsetSetter = require('./batch-offset-setter.js');
    const relativeOffsets = Array.apply(0, new Array(Offsets.slotWidth / 8)).map((e, i) => i * 8);

    const getWriteableEntriesForSlot = (slot, entries) => {
        const baseOffset = Offsets.getItemOffset(slot);

        const zeroFilledEntries = relativeOffsets.map((relativeOffset) => {
            return {
                offset: relativeOffset,
                value: 0
            };
        });

        const combinedEntries = zeroFilledEntries.map((e, i) => entries[i] || e);
        return combinedEntries.map(entry => {
            return {
                offset: baseOffset + entry.offset,
                value: entry.value
            };
        });
    };

    return (slotEntries, saveFile) => {
        let writeableEntries = [];

        slotEntries.forEach(slotEntry => {
            writeableEntries = writeableEntries.concat(getWriteableEntriesForSlot(slotEntry.slot, slotEntry.entries));
        });

        BatchOffsetSetter(writeableEntries, saveFile);
    };
})();