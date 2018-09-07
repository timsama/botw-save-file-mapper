module.exports = (() => {
    const Offsets = require('../lib/offsets.js');
    const OffsetChecker = require('../lib/offset-checker.js');
    const OffsetSetter = require('../lib/offset-setter.js');
    const mapItemSlots = require('./map-item-slots.js');
    const writeItemSlots = require('./write-item-slots.js');

    const bonusTypes = {
        0x2: 'durability',
        0x80: 'shieldsurf',
        0x100: 'shieldguard',
        0x80000002: 'durabilityplus',
        0x80000080: 'shieldsurfplus',
        0x80000100: 'shieldguardplus'
    };

    const bonusEnum = {
        'durability': 0x2,
        'shieldsurf': 0x80,
        'shieldguard': 0x100,
        'durabilityplus': 0x80000002,
        'shieldsurfplus': 0x80000080,
        'shieldguardplus': 0x80000100
    };

    const shieldStashOffset = 0x00048cd8;

    const getShieldSlots = (saveFile, startingSlot) => {
        return mapItemSlots(saveFile, startingSlot, 'shields', (item, slot, slotInCategory) => {
            const equippedOffset = Offsets.getEquippedSlotOffset(slot);
            const durabilityOffset = Offsets.getQuantitiesOffset(slot);

            const equipped = !!OffsetChecker(equippedOffset, saveFile);
            const durability = OffsetChecker(durabilityOffset, saveFile);

            const bonus = (() => {
                const typeOffset = Offsets.getBonusTypeOffset(slotInCategory, 'shields');
                const amountOffset = Offsets.getBonusAmountOffset(slotInCategory, 'shields');

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
                stash: OffsetChecker(shieldStashOffset, saveFile),
                slots: getShieldSlots(saveFile, startingSlot)
            };
        },
        write: (modelJson, saveFile, nextAvailableSlot) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            return writeItemSlots(saveFile, modelJson.slots, nextAvailableSlot, 'shields', (item, slot, slotInCategory) => {
                const equippedOffset = Offsets.getEquippedSlotOffset(slot);
                const durabilityOffset = Offsets.getQuantitiesOffset(slot);
                const typeOffset = Offsets.getBonusTypeOffset(slotInCategory, 'shields');
                const amountOffset = Offsets.getBonusAmountOffset(slotInCategory, 'shields');

                const valIfBonus = (lazyDef, fallback) => {
                    if (!!item.bonus) {
                        return lazyDef();
                    } else {
                        return fallback;
                    }
                };

                return [
                    {
                        offset: shieldStashOffset,
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
            });
        }
    };
})();