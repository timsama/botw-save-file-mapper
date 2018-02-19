const fs = require('fs');
const offsetChecker = require('./offset-checker.js');
const itemFileUtils = require('./item-file-utils.js');
const CONFIG = require('./config.js');
const nameGetter = require('./name-getter.js');
const objUtils = require('./obj-utils.js');
const getItemSlotKey = require('./get-item-slot-key.js');

const slot = parseInt(process.argv[3]);
const saveFile = !!process.argv[5] ? (CONFIG.snapshotspath + process.argv[3]) : CONFIG.savepath + 'game_data.sav';

const slotsOffset = 394248;
const slotWidth = 128;
const getOffset = (slot) => slotsOffset + slot * slotWidth;
const relativeOffsets = Array.apply(0, new Array(slotWidth / 8)).map((e, i) => i * 8);

const category = nameGetter.getOrUndefined(process.argv[2], 'Item category: ', 'Unnamed categories not allowed.');
const exportFilename = itemFileUtils.getCategoryFilepath(category.toLowerCase());

if (!!exportFilename) {
    const weaponSlots = offsetChecker(0x00085048, saveFile);
    const shieldSlots = offsetChecker(0x00048cd8, saveFile);
    const bowSlots = offsetChecker(0x000e3348, saveFile);

    const arrows = itemFileUtils.getFileAsJsonOrEmptyJsObject(itemFileUtils.getCategoryFilepath('arrows'));
    const arrowTypes = arrows.getSortedKeys().map(key => arrows[key][0]);
    const arrowSlots = (() => {
        const start = weaponSlots + bowSlots;
        const slots = arrowTypes.map((name, i) => i + start);
        return slots.reduce((acc, slot) => {
            const offset = slotsOffset + slot * slotWidth;
            const value = offsetChecker(offset, saveFile);
            return acc.concat(arrowTypes.find(arrow => {
                return arrow.value === value;
            }));
        }, []).filter(s => !!s).length;
    })();

    const armorSlots = (() => {
        const start = weaponSlots + bowSlots + arrowSlots + shieldSlots;
        let slotCount = 0;
        while(offsetChecker(getOffset(start + slotCount), saveFile) === 1098018159) {
            slotCount++;
        }
        return slotCount;
    })();

    const countCategorySlots = (start, category) => {
        const categoryFilepath = itemFileUtils.getCategoryFilepath(category);
        const categoryJson = itemFileUtils.getFileAsJsonOrEmptyJsObject(categoryFilepath);
        let slotCount = 0;
        while(!!categoryJson[getItemSlotKey(start + slotCount, category)]) {
            slotCount++;
        }
        return slotCount;
    };

    const materialSlots = countCategorySlots(weaponSlots + bowSlots + arrowSlots + shieldSlots + armorSlots, 'materials');
    const foodSlots = countCategorySlots(weaponSlots + bowSlots + arrowSlots + shieldSlots + armorSlots + materialSlots, 'food');
    const keyItemSlots = countCategorySlots(weaponSlots + bowSlots + arrowSlots + shieldSlots + armorSlots + materialSlots + foodSlots, 'keyitems');

    const startingSlot = (() => {
        const startingSlots = {
            weapons: 0,
            bows: weaponSlots,
            arrows: weaponSlots + bowSlots,
            shields: weaponSlots + bowSlots + arrowSlots,
            armor: weaponSlots + bowSlots + arrowSlots + shieldSlots,
            materials: weaponSlots + bowSlots + arrowSlots + shieldSlots + armorSlots,
            food: weaponSlots + bowSlots + arrowSlots + shieldSlots + armorSlots + materialSlots,
            keyitems: weaponSlots + bowSlots + arrowSlots + shieldSlots + armorSlots + materialSlots + foodSlots
        };

        return startingSlots[category] + slot - 1;
    })();

    if (!!startingSlot) {
        const name = nameGetter.getOrUndefined(process.argv[4], 'Item name: ', 'Unnamed items not allowed.');

        if (!!name) {
            const baseOffset = getOffset(startingSlot);
            const entries = relativeOffsets.map((relativeOffset) => {
                const offset = baseOffset + relativeOffset;
                const value = offsetChecker(offset, saveFile);
                return {offset: relativeOffset, value: value};
            }).filter((entry, i) => {
                return i < 4 || entry.value !== 0;
            });

            const json = itemFileUtils.getFileAsJsonOrEmptyJsObject(exportFilename);

            json[name] = entries;

            itemFileUtils.saveJsonFile(exportFilename, json);
        }
    }
} else {
    console.log('Category not recognized.');
}
