module.exports = (() => {
    const Offsets = require('../offsets.js');
    const OffsetChecker = require('../offset-checker.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const mapItemSlots = require('./map-item-slots.js');

    const bonusTypes = {
        0: 'none',
        0x1: 'attack',
        0x2: 'durability',
        0x4: 'critical',
        0x8: 'longthrow',
        0x80000001: 'attackplus',
        0x80000002: 'durabilityplus',
        0x80000004: 'criticalplus',
        0x80000008: 'longthrowplus'
    };

    const getWeaponSlots = (saveFile) => {
        return mapItemSlots(saveFile, 'weapons', (item, slot, slotInCategory) => {
            const quantitiesOffset = Offsets.getQuantitiesOffset(slot);
            const equippedOffset = Offsets.getEquippedSlotOffset(slot);

            const equipped = !!OffsetChecker(equippedOffset, saveFile);
                    
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
                durability: OffsetChecker(quantitiesOffset, saveFile),
                bonus: bonus
            };
        });
    };

    return {
        read: (saveFile) => {
            return {
                slots: getWeaponSlots(saveFile)
            };
        },
        write: (saveFile, modelJson) => {
            const slotStructure = getItemSlotStructure(saveFile);
            

        }
    };
})();