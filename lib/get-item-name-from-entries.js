module.exports = (() => {
    const Offsets = require('./offsets.js');
    const OffsetChecker = require('./offset-checker.js');
    const getItemEntries = require('./get-item-entries.js');
    const itemFileUtils = require('../util/item-file-utils.js');

    return (category) => {
        const categoryFilepath = itemFileUtils.getCategoryFilepath(category);
        const categoryJson = itemFileUtils.getFileAsJsonOrEmptyJsObject(categoryFilepath);
        const itemKeys = categoryJson.getSortedKeys();

        return (entries) => {
            return itemKeys.find((itemKey) => {
                const isMatch = categoryJson[itemKey].entries.every((itemEntry, i) => {
                    return entries && entries[i] && itemEntry.offset === entries[i].offset
                        && itemEntry.value === entries[i].value;
                });

                return isMatch;
            });
        };
    };
})();