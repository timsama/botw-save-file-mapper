module.exports = (() => {
    const Offsets = require('./offsets.js');
    const OffsetChecker = require('./offset-checker.js');
    const getItemEntries = require('./get-item-entries.js');
    const getItemNameFromEntries = require('./get-item-name-from-entries.js');
    const itemFileUtils = require('./util/item-file-utils.js');

    return (saveFile, slot, category) => {
        const entries = getItemEntries(saveFile, slot);

        return getItemNameFromEntries(category)(entries);
    };
})();