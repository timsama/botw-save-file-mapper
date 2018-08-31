module.exports = (() => {
    const Offsets = require('../offsets.js');
    const OffsetChecker = require('../offset-checker.js');
    const OffsetSetter = require('../offset-setter.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const mapItemSlots = require('./map-item-slots.js');
    const writeItemSlots = require('./write-item-slots.js');

    const bonusTypes = {
        0: 'none',
        0x2: 'durability',
        0x80: 'shieldsurf',
        0x100: 'shieldguard',
        0x80000002: 'durabilityplus',
        0x80000080: 'shieldsurfplus',
        0x80000100: 'shieldguardplus'
    };

    const bonusEnum = {
        'none': 0,
        'durability': 0x2,
        'shieldsurf': 0x80,
        'shieldguard': 0x100,
        'durabilityplus': 0x80000002,
        'shieldsurfplus': 0x80000080,
        'shieldguardplus': 0x80000100
    };

    const shieldStashOffset = 0x00048cd8;

    const getShieldSlots = (saveFile) => {
        return mapItemSlots(saveFile, 'shields', (item, slot, slotInCategory) => {
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
        read: (saveFile) => {
            return {
                slots: getShieldSlots(saveFile)
            };
        },
        write: (modelJson, saveFile) => {
            OffsetSetter(shieldStashOffset, modelJson.stash, saveFile);
            writeItemSlots(saveFile, modelJson.slots, 'shields', (item, slot, slotInCategory) => {
                const equippedOffset = Offsets.getEquippedSlotOffset(slot);
                const durabilityOffset = Offsets.getQuantitiesOffset(slot);

                OffsetSetter(equippedOffset, item.equipped ? 1 : 0, saveFile);
                OffsetSetter(durabilityOffset, item.durability, saveFile);

                const typeOffset = Offsets.getBonusTypeOffset(slotInCategory, 'shields');
                const amountOffset = Offsets.getBonusAmountOffset(slotInCategory, 'shields');
                
                if (!!item.bonus) {
                    OffsetSetter(typeOffset, bonusEnum[item.bonus.type] || 0, saveFile);
                    OffsetSetter(amountOffset, item.bonus.amount, saveFile);
                } else {
                    OffsetSetter(typeOffset, 0, saveFile);
                    OffsetSetter(amountOffset, 0, saveFile);
                }
            });
        }
    };
})();