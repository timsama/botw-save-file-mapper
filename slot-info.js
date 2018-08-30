module.exports = (() => {
    const Offsets = require('./offsets.js');

    return {
        getOffsets: (slot, slotInCategory, category) => {
            const canCalculateBonus = slotInCategory !== undefined && !!category;
            const canCalculateFoodBonus = !!canCalculateBonus && category == 'food';

            const bonus = (() => {
                if (canCalculateFoodBonus) {
                    return {
                        type: Offsets.getFoodBonusTypeOffset(slotInCategory),
                        amount: Offsets.getFoodBonusAmountOffset(slotInCategory),
                        duration: Offsets.getFoodBonusDurationOffset(slotInCategory),
                        hearts: Offsets.getFoodHeartsOffset(slotInCategory),
                        width: foodWidth
                    };
                } else if (canCalculateBonus) {
                    return {
                        type: Offsets.getBonusTypeOffset(slotInCategory, category),
                        amount: Offsets.getBonusAmountOffset(slotInCategory, category)
                    };
                } else {
                    return {};
                }
            })();

            return {
                item: Offsets.getItemOffset(slot),
                quantity: Offsets.getQuantitiesOffset(slot),
                equipped: Offsets.getEquippedSlotOffset(slot),
                bonus: bonus
            };
        },
        getLengths: (slots, subsequentSlotsInCategory, category) => {
            const bonus = (() => {
                if (category === 'food') {
                    return {
                        type: Offsets.getFoodBonusTypeLength(subsequentSlotsInCategory),
                        amount: Offsets.getFoodBonusAmountLength(subsequentSlotsInCategory),
                        duration: Offsets.getFoodBonusDurationLength(subsequentSlotsInCategory),
                        hearts: Offsets.getFoodHeartsLength(subsequentSlotsInCategory)
                    };
                } else {
                    return {
                        type: Offsets.getBonusTypeLength(subsequentSlotsInCategory),
                        amount: Offsets.getBonusAmountLength(subsequentSlotsInCategory)
                    };
                }
            })();

            return {
                item: Offsets.getItemLength(slots),
                quantity: Offsets.getQuantitiesLength(slots),
                equipped: Offsets.getEquippedSlotLength(slots),
                bonus: bonus
            };
        }
    };
})();
