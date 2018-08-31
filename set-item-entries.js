module.exports = (() => {
    const Offsets = require('./offsets.js');
    const OffsetSetter = require('./offset-setter.js');
    const relativeOffsets = Array.apply(0, new Array(Offsets.slotWidth / 8)).map((e, i) => i * 8);

    return (saveFile, entries, slot) => {
        const baseOffset = Offsets.getItemOffset(slot);

        const zeroFilledEntries = relativeOffsets.map((relativeOffset) => {
            return {
                offset: relativeOffset,
                value: 0
            };
        });

        const writeableEntries = zeroFilledEntries.map((e, i) => entries[i] || e);

        writeableEntries.forEach(entry => {
            OffsetSetter(baseOffset + entry.offset, entry.value, saveFile);
        });
    };
})();