module.exports = (() => {
    const Offsets = require('./offsets.js');
    const BatchOffsetChecker = require('./batch-offset-checker.js');
    const relativeOffsets = Array.apply(0, new Array(Offsets.slotWidth / 8)).map((e, i) => i * 8);

    const getOffsetsForSlot = (slot) => {
        const baseOffset = Offsets.getItemOffset(slot);

        const offsets = relativeOffsets.map((relativeOffset) => {
            return baseOffset + relativeOffset;
        });

        return {
            slot: slot,
            offsets: offsets
        };
    }

    const absoluteToRelativeOffset = (offset, slot) => {
        const baseOffset = Offsets.getItemOffset(slot);
        return offset - baseOffset;
    };

    return (slots, saveFile) => {
        const offsetSlots = slots.map(getOffsetsForSlot);

        const slotEntries = BatchOffsetChecker(offsetSlots, saveFile);

        return slotEntries.map(slotEntry => {
            return {
                slot: slotEntry.slot.slot,
                entries: slotEntry.entries.filter(entry => {
                    return entry.value !== 0;
                }).map(entry => {
                    return {
                        offset: absoluteToRelativeOffset(entry.offset, slotEntry.slot.slot),
                        value: entry.value
                    };
                })
            };
        });
    };
})();