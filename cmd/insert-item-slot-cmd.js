const fs = require('fs');
const offsetChecker = require('../lib/offset-checker.js');
const offsetSetter = require('../lib/offset-setter.js');
const itemFileUtils = require('../util/item-file-utils.js');
const CONFIG = require('../config.json');
const nameGetter = require('../lib/name-getter.js');
const objUtils = require('../util/obj-utils.js');
const saveFileUtils = require('../util/save-file-utils.js');
const getItemSlotStructure = require('../lib/get-item-slot-structure.js');
const slotInfo = require('../lib/slot-info.js');
const FloatSeconds = require('../encoders_decoders/floatseconds.js');
const float32 = require('../encoders_decoders/float32.js');

const slot = parseInt(process.argv[3]);
const saveFile = !!process.argv[5] ? (CONFIG.snapshotspath + process.argv[5]) : CONFIG.savepath + 'game_data.sav';

const bonusTypes = {
    NONE: 0,
    ATTACK: 0x1,
    DURABILITY: 0x2,
    CRITICAL: 0x4,
    LONGTHROW: 0x8,
    FIVESHOTS: 0x10,
    THREESHOTS: 0x20,
    QUICKSHOT: 0x40,
    SHIELDSURF: 0x80,
    SHIELDGUARD: 0x100,
    ATTACKPLUS: 0x80000001,
    DURABILITYPLUS: 0x80000002,
    CRITICALPLUS: 0x80000004,
    LONGTHROWPLUS: 0x80000008,
    FIVESHOTSPLUS: 0x80000010,
    THREESHOTSPLUS: 0x80000020,
    QUICKSHOTPLUS: 0x80000040,
    SHIELDSURFPLUS: 0x80000080,
    SHIELDGUARDPLUS: 0x80000100
};

const foodBonusTypes = {
    NONE: 0,
    HEARTY: 0x40000000,
    CHILLY: 0x40800000,
    SPICY: 0x40a00000,
    ELECTRO: 0x40c00000,
    MIGHTY: 0x41200000,
    TOUGH: 0x41300000,
    SNEAKY: 0x41400000,
    HASTY: 0x41500000,
    ENERGIZING: 0x41600000,
    ENDURING: 0x41700000,
    FIREPROOF: 0x41800000
};

const maxFoodBonusAmounts = {
    HEARTY: 0xFFFFFFFF,
    CHILLY: 2,
    SPICY: 2,
    ELECTRO: 3,
    MIGHTY: 3,
    TOUGH: 3,
    SNEAKY: 3,
    HASTY: 3,
    ENERGIZING: 0xFFFFFFFF,
    ENDURING: 10,
    FIREPROOF: 0x2
};

const foodBonusAmounts = [
    0,
    0x3f800000,
    0x40000000,
    0x40400000
];

const dyes = {
    ORIGINAL: 0,
    BLUE: 1,
    RED: 2,
    YELLOW: 3,
    WHITE: 4,
    BLACK: 5,
    PURPLE: 6,
    GREEN: 7,
    LIGHTBLUE: 8,
    NAVY: 9,
    ORANGE: 10,
    PEACH: 11,
    CRIMSON: 12,
    LIGHTYELLOW: 13,
    BROWN: 14,
    GRAY: 15
};

const getBonusType = (name, category) => {
    if (category == 'food') {
        return foodBonusTypes[name.toUpperCase()] || 0;
    } else {
        return bonusTypes[name.toUpperCase()];
    }
}

const category = nameGetter.getOrUndefined(process.argv[2], 'Item category: ', 'Unnamed categories not allowed.');
const categoryFilename = itemFileUtils.getCategoryFilepath(category.toLowerCase());

if (!!categoryFilename) {
    const slotStructure = getItemSlotStructure(saveFile);

    const baseSlot = slotStructure[category].first + slot - 1;

    const totalSlotsInCategory = slotStructure[category].last - slotStructure[category].first;
    const subsequentSlotsInCategory = totalSlotsInCategory - (slot - 1);

    if (!!baseSlot || baseSlot === 0) {
        const nameStr = nameGetter.getOrUndefined(process.argv[4], 'Item name: ', 'Unnamed items not allowed.');

        if (!!nameStr) {
            const [quantityStr] = nameStr.split('x').reverse();
            const rawQuantity = parseInt(quantityStr);
            const nameWithBonus = (() => {
                if (isNaN(rawQuantity)) {
                    return nameStr;
                } else {
                    return nameStr.split('x').slice(0, -1).join('x');
                }
            })();
            const terms = nameWithBonus.split('+');
            const colorTerm = terms.map(term => term.toUpperCase()).find(term => dyes[term] !== undefined);
            const color = colorTerm && dyes[colorTerm];
            const [name, bonusType, bonusAmount, bonusDuration] = terms.filter(term => term !== colorTerm);
            const base = slotInfo.getOffsets(baseSlot, slot - 1, category);
            const next = slotInfo.getOffsets(baseSlot + 1, slot, category);
            
            const json = itemFileUtils.getFileAsJsonOrEmptyJsObject(categoryFilename);

            const jsonItem = json[name];
            const rawEntries = jsonItem.entries;
            const quantity = rawQuantity || jsonItem.durability || jsonItem.quantity;
            const slotWidth = 128;
            const zeroFilledEntries = Array.apply(0, new Array(slotWidth / 8)).map((e, i) => {
                return {
                    offset: i * 8,
                    value: 0
                };
            });
            const entries = zeroFilledEntries.map((e, i) => rawEntries[i] || e);

            var slots = 1;
            var end = false;
            while(!end) {
                const nextOffset = slotInfo.getOffsets(baseSlot + slots, slot, category).item;
                end = offsetChecker(nextOffset, saveFile) == 0;
                slots++;
            }

            const lengths = slotInfo.getLengths(slots, subsequentSlotsInCategory, category);

            if (!!entries) {
                saveFileUtils.shiftData(saveFile, base.item, next.item, lengths.item);
                saveFileUtils.shiftData(saveFile, base.quantity, next.quantity, lengths.quantity);
                saveFileUtils.shiftData(saveFile, base.equipped, next.equipped, lengths.equipped);
                saveFileUtils.shiftData(saveFile, base.bonus.type, next.bonus.type, lengths.bonus.type, base.bonus.width);
                saveFileUtils.shiftData(saveFile, base.bonus.amount, next.bonus.amount, lengths.bonus.amount, base.bonus.width);
                if (category === 'food') {
                    saveFileUtils.shiftData(saveFile, base.bonus.duration, next.bonus.duration, lengths.bonus.duration);
                    saveFileUtils.shiftData(saveFile, base.bonus.hearts, next.bonus.hearts, lengths.bonus.hearts);
                }
                entries.forEach(entry => {
                    offsetSetter(base.item + entry.offset, entry.value, saveFile);
                });
                const actualBonusType = bonusType && bonusType.toUpperCase() || 'NONE';
                if (!!quantity && category !== 'armor') {
                    if (category === 'food') {
                        const quarterhearts = (() => {
                            if (actualBonusType === 'HEARTY' && bonusAmount) {
                                return Math.floor(bonusAmount) * 4;
                            } else {
                                return Math.floor(parseFloat(quantityStr) * 4);
                            }
                        })();
                        offsetSetter(base.bonus.hearts, float32.encode(quarterhearts), saveFile);
                    } else {
                        offsetSetter(base.quantity, quantity, saveFile);
                    }
                } else if (category === 'armor') {
                    if (!!color) {
                        offsetSetter(base.quantity, color, saveFile);
                    } else {
                        offsetSetter(base.quantity, dyes.ORIGINAL, saveFile);
                    }
                }
                if (category !== 'arrows' && category !== 'armor') {
                    offsetSetter(base.bonus.type, getBonusType(actualBonusType, category), saveFile);
                }
                if (bonusAmount !== undefined) {
                    if (category === 'food') {
                        const maxBonus = maxFoodBonusAmounts[actualBonusType];
                        const bonus = bonusAmount > maxBonus ? maxBonus : bonusAmount;
                        if (actualBonusType === 'ENERGIZING' && bonus) {
                            const staminaWheel = Math.floor(bonus) * 200;
                            offsetSetter(base.bonus.amount, float32.encode(staminaWheel), saveFile);
                        } else if (actualBonusType === 'ENDURING' && bonus) {
                            const staminaOverfillSections = Math.floor(bonus);
                            offsetSetter(base.bonus.amount, float32.encode(staminaOverfillSections), saveFile);
                        } else if (foodBonusAmounts[bonus] !== undefined && actualBonusType !== 'HEARTY') {
                            offsetSetter(base.bonus.amount, foodBonusAmounts[bonus], saveFile);
                        }
                    } else {
                        offsetSetter(base.bonus.amount, bonusAmount || 0, saveFile);
                    }
                }
                if (actualBonusType !== 'NONE' && !bonusDuration) {
                    offsetSetter(base.bonus.duration, FloatSeconds.encode('03:00'), saveFile);
                } else if (!!bonusDuration && base.bonus.duration) {
                    offsetSetter(base.bonus.duration, FloatSeconds.encode(bonusDuration || '00:00'), saveFile);
                }
                if (actualBonusType === 'NONE' && category !== 'arrows' && category !== 'armor') {
                    offsetSetter(base.bonus.amount, 0, saveFile);
                    offsetSetter(base.bonus.duration, 0, saveFile);
                }
            } else {
                console.log(`No entries found for '${name}' in ${category}.`);
            }
        }
    }
} else {
    console.log('Category not recognized.');
}
