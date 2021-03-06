module.exports = (() => {
    const Offsets = require('../lib/offsets.js');
    const OffsetChecker = require('../lib/offset-checker.js');
    const OffsetSetter = require('../lib/offset-setter.js');
    const mapItemSlots = require('./map-item-slots.js');
    const writeItemSlots = require('./write-item-slots.js');
    const CONFIG = require('../config.json');
    const changeWriter = require('../lib/batch-apply-changes.js');
    const defaultEffectMap = `${CONFIG.mapfilepath}effectmap.json`;

    const getChangeWriter = (saveFile, effectMapPath) => {
        return (keys, options) => {
            return changeWriter(saveFile)(effectMapPath || defaultEffectMap, keys, options);
        };
    };

    const bonusTypes = {
        0x1: "attack",
        0x2: "durability",
        0x10: "fiveshots",
        0x20: "threeshots",
        0x40: "quickshot",
        0x80000001: "attackplus",
        0x80000002: "durabilityplus",
        0x80000010: "fiveshotsplus",
        0x80000020: "threeshotsplus",
        0x80000040: "quickshotplus"
    };

    const bonusEnum = {
        "attack": 0x1,
        "durability": 0x2,
        "fiveshots": 0x10,
        "threeshots": 0x20,
        "quickshot": 0x40,
        "attackplus": 0x80000001,
        "durabilityplus": 0x80000002,
        "fiveshotsplus": 0x80000010,
        "threeshotsplus": 0x80000020,
        "quickshotplus": 0x80000040
    };

    const bowStashOffset = 0x000e3348;

    const getBowSlots = (saveFile, startingSlot) => {
        return mapItemSlots(saveFile, startingSlot, 'bows', (item, slot, slotInCategory) => {
            const equippedOffset = Offsets.getEquippedSlotOffset(slot);
            const durabilityOffset = Offsets.getQuantitiesOffset(slot);
            
            const equipped = !!OffsetChecker(equippedOffset, saveFile);
            const durability = OffsetChecker(durabilityOffset, saveFile);

            const bonus = (() => {
                const typeOffset = Offsets.getBonusTypeOffset(slotInCategory, 'bows');
                const amountOffset = Offsets.getBonusAmountOffset(slotInCategory, 'bows');

                const type = bonusTypes[OffsetChecker(typeOffset, saveFile)];
                if (type !== undefined) {
                    const amount = OffsetChecker(amountOffset, saveFile);
                    return {
                        amount: amount,
                        type: type
                    };
                } else {
                    return undefined;
                }
            })();

            return {
                name: item.name,
                equipped: equipped,
                durability: durability,
                bonus: bonus
            };
        });
    };

    return {
        read: (saveFile, startingSlot) => {
            return {
                stash: OffsetChecker(bowStashOffset, saveFile),
                slots: getBowSlots(saveFile, startingSlot)
            };
        },
        write: (modelJson, saveFile, startingSlot, options, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve(startingSlot);
            }

            const quickTipsPromise = (() => {
                if ((!options || !options.skipSoftDependencies) && modelJson.slots.length > 1) {
                    const writeChanges = getChangeWriter(saveFile, effectMapPath);
                    return writeChanges(['quicktips.switchbows.viewed'], options);
                } else {
                    return Promise.resolve();
                }
            })();

            return quickTipsPromise.then(() => writeItemSlots(saveFile, modelJson.slots, startingSlot, 'bows', options, (item, slot, slotInCategory) => {
                const equippedOffset = Offsets.getEquippedSlotOffset(slot);
                const durabilityOffset = Offsets.getQuantitiesOffset(slot);
                const typeOffset = Offsets.getBonusTypeOffset(slotInCategory, 'bows');
                const amountOffset = Offsets.getBonusAmountOffset(slotInCategory, 'bows');

                const valIfBonus = (lazyDef, fallback) => {
                    if (!!item.bonus) {
                        return lazyDef();
                    } else {
                        return fallback;
                    }
                };

                return [
                    {
                        offset: bowStashOffset,
                        value: modelJson.stash
                    },
                    {
                        offset: equippedOffset,
                        value: item.equipped ? 1 : 0
                    },
                    {
                        offset: durabilityOffset,
                        value: item.durability
                    },
                    {
                        offset: typeOffset,
                        value: valIfBonus(() => { return bonusEnum[item.bonus.type] || 0; }, 0)
                    },
                    {
                        offset: amountOffset,
                        value: valIfBonus(() => { return item.bonus.amount; }, 0)
                    }
                ];
            }));
        }
    };
})();