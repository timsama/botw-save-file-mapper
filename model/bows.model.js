module.exports = (() => {
    const Offsets = require('../offsets.js');
    const OffsetChecker = require('../offset-checker.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const mapItemSlots = require('./map-item-slots.js');

    const bonusTypes = {
        0: "none",
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

    const getBowSlots = (saveFile) => {
        return mapItemSlots(saveFile, 'bows', (item, slot, slotInCategory) => {
            const quantitiesOffset = Offsets.getQuantitiesOffset(slot);
            const equippedOffset = Offsets.getEquippedSlotOffset(slot);
            
            const equipped = !!OffsetChecker(equippedOffset, saveFile);

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
                durability: OffsetChecker(quantitiesOffset, saveFile),
                bonus: bonus
            };
        });
    };

    return {
        read: (saveFile) => {
            return {
                slots: getBowSlots(saveFile)
            };
        },
        write: (saveFile, modelJson) => {
            const slotStructure = getItemSlotStructure(saveFile);
            

        }
    };
})();