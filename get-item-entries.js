module.exports = (() => {
    const Offsets = require('./offsets.js');
    const OffsetChecker = require('./offset-checker.js');
    const relativeOffsets = Array.apply(0, new Array(Offsets.slotWidth / 8)).map((e, i) => i * 8);

    return (saveFile, slot) => {
        const baseOffset = Offsets.getItemOffset(slot);

        const entries = relativeOffsets.map((relativeOffset) => {
            const offset = baseOffset + relativeOffset;
            const value = OffsetChecker(offset, saveFile);
            return {offset: relativeOffset, value: value};
        }).filter((entry, i) => {
            return entry.value !== 0;
        });

        return entries;
    };
})();