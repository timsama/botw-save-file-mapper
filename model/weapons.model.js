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
        0x1: 'attack',
        0x2: 'durability',
        0x4: 'critical',
        0x8: 'longthrow',
        0x80000001: 'attackplus',
        0x80000002: 'durabilityplus',
        0x80000004: 'criticalplus',
        0x80000008: 'longthrowplus'
    };

    const bonusEnum = {
        'attack': 0x1,
        'durability': 0x2,
        'critical': 0x4,
        'longthrow': 0x8,
        'attackplus': 0x80000001,
        'durabilityplus': 0x80000002,
        'criticalplus': 0x80000004,
        'longthrowplus': 0x80000008
    };

    const weaponStashOffset = 0x00085048;

    const getWeaponSlots = (saveFile, startingSlot) => {
        return mapItemSlots(saveFile, startingSlot, 'weapons', (item, slot, slotInCategory) => {
            const equippedOffset = Offsets.getEquippedSlotOffset(slot);
            const durabilityOffset = Offsets.getQuantitiesOffset(slot);

            const equipped = !!OffsetChecker(equippedOffset, saveFile);
            const durability = OffsetChecker(durabilityOffset, saveFile);
                    
            const bonus = (() => {
                const typeOffset = Offsets.getBonusTypeOffset(slotInCategory, 'weapons');
                const amountOffset = Offsets.getBonusAmountOffset(slotInCategory, 'weapons');

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
                stash: OffsetChecker(weaponStashOffset, saveFile),
                slots: getWeaponSlots(saveFile, startingSlot)
            };
        },
        write: (modelJson, saveFile, startingSlot, options, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }

            const quickTipsPromise = (() => {
                if (!options.skipSoftDependenceis && modelJson.slots.length > 1) {
                    const writeChanges = getChangeWriter(saveFile, effectMapPath);
                    return writeChanges(['quicktips.switchweapons.viewed', 'quicktips.throwweapon.viewed'], options);
                } else {
                    return Promise.resolve();
                }
            })();

            return quickTipsPromise.then(() => writeItemSlots(saveFile, modelJson.slots, startingSlot, 'weapons', options, (item, slot, slotInCategory) => {
                const equippedOffset = Offsets.getEquippedSlotOffset(slot);
                const durabilityOffset = Offsets.getQuantitiesOffset(slot);
                const typeOffset = Offsets.getBonusTypeOffset(slotInCategory, 'weapons');
                const amountOffset = Offsets.getBonusAmountOffset(slotInCategory, 'weapons');

                const valIfBonus = (lazyDef, fallback) => {
                    if (!!item.bonus) {
                        return lazyDef();
                    } else {
                        return fallback;
                    }
                };

                return [
                    {
                        offset: weaponStashOffset,
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