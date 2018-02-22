module.exports = (() => {
    return (saveFile) => {
        const offsetChecker = require('./offset-checker.js');
        const itemFileUtils = require('./item-file-utils.js');
        const getItemSlotKey = require('./get-item-slot-key.js');

        const slotsOffset = 394248;
        const slotWidth = 128;
        const getOffset = (slot) => slotsOffset + slot * slotWidth;

        const weaponTypes = {
            TWOHANDED: 1869504332,
            MELEE_OTHER: 1869504339,
            BOW: 1869504322
        };

        const weaponFirst = 0;
        const weaponSlots = (() => {
            const maxWeaponSlots = offsetChecker(0x00085048, saveFile);
            let slotCount = 0;
            let isValidWeapon = true;
            while(isValidWeapon && slotCount < maxWeaponSlots) {
                weaponType = offsetChecker(getOffset(weaponFirst + slotCount) + 8, saveFile);
                isValidWeapon = weaponType == weaponTypes.TWOHANDED || weaponType == weaponTypes.MELEE_OTHER;
                isValidWeapon && slotCount++;
            }
            return slotCount;
        })();
        const bowFirst = weaponSlots;
        const weaponLast = bowFirst - 1;

        const bowSlots = (() => {
            const maxBowSlots = offsetChecker(0x000e3348, saveFile);
            let slotCount = 0;
            let isValidBow = true;
            while(isValidBow && slotCount < maxBowSlots) {
                weaponType = offsetChecker(getOffset(bowFirst + slotCount) + 8, saveFile);
                isValidBow = weaponType == weaponTypes.BOW;
                isValidBow && slotCount++;
            }
            return slotCount;
        })();
        const arrowFirst = bowFirst + bowSlots;
        const bowLast = arrowFirst - 1;

        const arrows = itemFileUtils.getFileAsJsonOrEmptyJsObject(itemFileUtils.getCategoryFilepath('arrows'));
        const arrowTypes = arrows.getSortedKeys().map(key => arrows[key][0]);
        const arrowSlots = (() => {
            const slots = arrowTypes.map((name, i) => i + arrowFirst);
            return slots.reduce((acc, slot) => {
                const offset = slotsOffset + slot * slotWidth;
                const value = offsetChecker(offset, saveFile);
                return acc.concat(arrowTypes.find(arrow => {
                    return arrow.value === value;
                }));
            }, []).filter(s => !!s).length;
        })();
        const shieldFirst = arrowFirst + arrowSlots;
        const arrowLast = shieldFirst - 1;

        const shieldSlots = offsetChecker(0x00048cd8, saveFile);
        const armorFirst = shieldFirst + shieldSlots;
        const shieldLast = armorFirst - 1;

        const armorSlots = (() => {
            let slotCount = 0;
            while(offsetChecker(getOffset(armorFirst + slotCount), saveFile) === 1098018159) {
                slotCount++;
            }
            return slotCount;
        })();
        const materialFirst = armorFirst + armorSlots;
        const armorLast = materialFirst - 1;

        const countCategorySlots = (start, category) => {
            const categoryFilepath = itemFileUtils.getCategoryFilepath(category);
            const categoryJson = itemFileUtils.getFileAsJsonOrEmptyJsObject(categoryFilepath);
            let slotCount = 0;
            while(!!categoryJson[getItemSlotKey(start + slotCount, category)]) {
                slotCount++;
            }
            return slotCount;
        };

        const materialSlots = countCategorySlots(materialFirst, 'materials');
        // console.log('material slots: ' + materialSlots);
        // console.log('material first: ' + materialFirst);
        const foodFirst = materialFirst + materialSlots;
        const materialLast = foodFirst - 1;

        const foodSlots = countCategorySlots(foodFirst, 'food');
        // console.log('food slots: ' + foodSlots);
        const keyItemFirst = foodFirst + foodSlots;
        const foodLast = keyItemFirst - 1;

        const keyItemSlots = countCategorySlots(keyItemFirst, 'keyitems');
        // console.log('keyitem slots: ' + keyItemSlots);
        const keyItemLast = keyItemFirst + keyItemSlots - 1;

        return {
            weapons: {first: weaponFirst, last: weaponLast},
            bows: {first: bowFirst, last: bowLast},
            arrows: {first: arrowFirst, last: arrowLast},
            shields: {first: shieldFirst, last: shieldLast},
            armor: {first: armorFirst, last: armorLast},
            materials: {first: materialFirst, last: materialLast},
            food: {first: foodFirst, last: foodLast},
            keyitems: {first: keyItemFirst, last: keyItemLast}
        };
    };
})();