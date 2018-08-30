module.exports = (() => {
    const Offsets = require('./offsets.js');
    const OffsetChecker = require('./offset-checker.js');
    const getItemEntries = require('./get-item-entries.js');
    const itemFileUtils = require('./item-file-utils.js');

    return (saveFile, slot, category) => {
        const categoryFilepath = itemFileUtils.getCategoryFilepath(category);
        const categoryJson = itemFileUtils.getFileAsJsonOrEmptyJsObject(categoryFilepath);
        const itemKeys = categoryJson.getSortedKeys();

        const entries = getItemEntries(saveFile, slot);

        return itemKeys.find((itemKey) => {
            const isMatch = categoryJson[itemKey].entries.every((itemEntry, i) => {
                return itemEntry.offset === entries[i].offset
                    && itemEntry.value === entries[i].value;
            });

            return isMatch;
        });
    };
})();