const fs = require('fs');
const offsetChecker = require('./offset-checker.js');
const itemFileUtils = require('./item-file-utils.js');
const CONFIG = require('./config.js');
const nameGetter = require('./name-getter.js');
const objUtils = require('./obj-utils.js');
const getItemSlotStructure = require('./get-item-slot-structure.js');

const saveFile = !!process.argv[3] ? (CONFIG.snapshotspath + process.argv[3]) : CONFIG.savepath + 'game_data.sav';
const [headName, bodyName, feetName] = process.argv[2].split(':');

const slotsOffset = 394248;
const slotWidth = 128;
const getOffset = (slot) => slotsOffset + slot * slotWidth;
const relativeOffsets = Array.apply(0, new Array(slotWidth / 8)).map((e, i) => i * 8);

const category = 'armor';
const exportFilename = itemFileUtils.getCategoryFilepath(category.toLowerCase());

if (!!exportFilename) {
    const slotStructure = getItemSlotStructure(saveFile);
    const json = itemFileUtils.getFileAsJsonOrEmptyJsObject(exportFilename);

    const exportSlot = (slot, baseName) => {
        const starsToAppend = 4 - (slot - 1) % 5;
        const stars = ("****").slice(0, starsToAppend);
        const name = baseName + stars;
        const baseSlot = slotStructure[category].first + slot - 1;

        if (!!baseSlot || baseSlot === 0) {
            const baseOffset = getOffset(baseSlot);
            const entries = relativeOffsets.map((relativeOffset) => {
                const offset = baseOffset + relativeOffset;
                const value = offsetChecker(offset, saveFile);
                return {offset: relativeOffset, value: value};
            }).filter((entry, i) => {
                return i < 4 || entry.value !== 0;
            });

            json[name] = entries;
        }
    };

    function* slotGenerator() {
        let i = 1;
        while(true) {
            yield i++;
        }
    };

    const slotGen = slotGenerator();

    const getNextSlot = () => {
        return slotGen.next().value;
    };

    const getNextFiveSlots = () => {
        return Array.apply(0, new Array(5)).map(e => {
            return getNextSlot();
        });
    };

    if (!!headName) {
        const slots = getNextFiveSlots();
        slots.forEach(slot => exportSlot(slot, headName));
    }
    if (!!bodyName) {
        const slots = getNextFiveSlots();
        slots.forEach(slot => exportSlot(slot, bodyName));
    }
    if (!!feetName) {
        const slots = getNextFiveSlots();
        slots.forEach(slot => exportSlot(slot, feetName));
    }

    itemFileUtils.saveJsonFile(exportFilename, json);
} else {
    console.log('Category not recognized.');
}
