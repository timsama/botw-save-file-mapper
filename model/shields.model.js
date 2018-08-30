module.exports = (() => {
    const Offsets = require('../offsets.js');
    const OffsetChecker = require('../offset-checker.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const mapItemSlots = require('./map-item-slots.js');

    const bonusTypes = {
        0: 'none',
        0x2: 'durability',
        0x80: 'shieldsurf',
        0x100: 'shieldguard',
        0x80000002: 'durabilityplus',
        0x80000080: 'shieldsurfplus',
        0x80000100: 'shieldguardplus'
    };

    const getShieldSlots = (saveFile) => {
        return mapItemSlots(saveFile, 'shields', (item, slot, slotInCategory) => {
            const quantitiesOffset = Offsets.getQuantitiesOffset(slot);
            const equippedOffset = Offsets.getEquippedSlotOffset(slot);

            const equipped = !!OffsetChecker(equippedOffset, saveFile);
            
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
                durability: OffsetChecker(quantitiesOffset, saveFile),
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
        write: (saveFile, modelJson) => {
            const slotStructure = getItemSlotStructure(saveFile);
            

        }
    };
})();