module.exports = (() => {
    const getItemNameAtSlot = require('../get-item-name-at-slot.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const itemFileUtils = require('../item-file-utils.js');

    return (saveFile, category, func) => {
        const itemsFilepath = itemFileUtils.getCategoryFilepath(category);
        const itemsJson = itemFileUtils.getFileAsJsonOrEmptyJsObject(itemsFilepath);
        const slotStructure = getItemSlotStructure(saveFile)[category];
        const items = [];

        for (let slot = slotStructure.first; slot <= slotStructure.last; slot++) {
            const name = getItemNameAtSlot(saveFile, slot, category);
            if (!!name) {
                const itemJson = itemsJson[name];
                itemJson.name = name;

                const item = func(itemJson, slot);

                items.push(item);
            } else {
                console.log(`Item at slot ${slot} could not be found!`);
            }
        }

        return items;
    };
})();