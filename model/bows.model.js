module.exports = (() => {
    const Offsets = require('../offsets.js');
    const OffsetChecker = require('../offset-checker.js');
    const OffsetSetter = require('../offset-setter.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const mapItemSlots = require('./map-item-slots.js');
    const writeItemSlots = require('./write-item-slots.js');

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

    const bonusEnum = {
        "none": 0,
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

    const getBowSlots = (saveFile) => {
        return mapItemSlots(saveFile, 'bows', (item, slot, slotInCategory) => {
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
        read: (saveFile) => {
            return {
                slots: getBowSlots(saveFile)
            };
        },
        write: (modelJson, saveFile) => {
            OffsetSetter(bowStashOffset, modelJson.stash, saveFile);
            writeItemSlots(saveFile, modelJson.slots, 'bows', (item, slot, slotInCategory) => {
                const equippedOffset = Offsets.getEquippedSlotOffset(slot);
                const durabilityOffset = Offsets.getQuantitiesOffset(slot);

                OffsetSetter(equippedOffset, item.equipped ? 1 : 0, saveFile);
                OffsetSetter(durabilityOffset, item.durability, saveFile);

                const typeOffset = Offsets.getBonusTypeOffset(slotInCategory, 'bows');
                const amountOffset = Offsets.getBonusAmountOffset(slotInCategory, 'bows');
                
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