module.exports = (() => {
    return (absoluteSlot, category) => {
        const offsetChecker = require('./offset-checker.js');
        const CONFIG = require('./config.js');
        const itemFileUtils = require('./item-file-utils.js');

        const filename = CONFIG.savepath + 'game_data.sav';

        const slotsOffset = 394248;
        const slotWidth = 128;
        const baseOffset = slotsOffset + absoluteSlot * slotWidth;
        const relativeOffsets = Array.apply(0, new Array(slotWidth / 8)).map((e, i) => i * 8);

        const entries = relativeOffsets.map((relativeOffset) => {
            const offset = baseOffset + relativeOffset;
            const value = offsetChecker(offset, filename);
            return {offset: relativeOffset, value: value};
        }).filter((entry, i) => {
            return entry.value !== 0;
        });
        
        const itemFile = itemFileUtils.getCategoryFilepath(category);
        const json = itemFileUtils.getFileAsJsonOrEmptyJsObject(itemFile);

        const itemKeys = json.getSortedKeys();
        return itemKeys.find((itemKey) => {
            const isMatch = json[itemKey].entries.every((itemEntry, i) => {
                return entries[i] !== undefined && itemEntry.offset === entries[i].offset
                    && itemEntry.value === entries[i].value;
            });

            return isMatch;
        });
    };
})();
