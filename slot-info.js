module.exports = (() => {
    const slotsOffset = 0x60408;
    const slotWidth = 128;
    const getItemLength = (slots) => slots * slotWidth;
    const getItemOffset = (slot) => slotsOffset + getItemLength(slot);

    const quantitiesOffset = 0x000711c8;
    const quantitiesWidth = 8;
    const getQuantitiesLength = (slots) => slots * quantitiesWidth;
    const getQuantitiesOffset = (slot) => quantitiesOffset + getQuantitiesLength(slot);

    const equippedSlotsOffset = 0x00080d70;
    const equippedSlotsWidth = 8;
    const getEquippedSlotLength = (slots) => slots * equippedSlotsWidth;
    const getEquippedSlotOffset = (slot) => equippedSlotsOffset + getEquippedSlotLength(slot);

    const bowBonusTypeOffset = 0x00004990;
    const shieldBonusTypeOffset = 0x000d1038;
    const weaponBonusTypeOffset = 0x0005dd20;
    const bonusTypeWidth = 8;
    const getBonusTypeLength = (slots) => slots * bonusTypeWidth;
    const getBonusTypeOffset = (slot, category) => {
        const baseOffset = (() => {
            if (category.toLowerCase() === 'bows') {
                return bowBonusTypeOffset;
            } else if (category.toLowerCase() === 'shields') {
                return shieldBonusTypeOffset;
            } else {
                return weaponBonusTypeOffset;
            }
        })();

        return baseOffset + getBonusTypeLength(slot);
    };

    const bowBonusAmountOffset = 0x0000b1e0;
    const shieldBonusAmountOffset = 0x00071098;
    const weaponBonusAmountOffset = 0x000c4c68;
    const bonusAmountWidth = 8;
    const getBonusAmountLength = (slots) => slots * bonusAmountWidth;
    const getBonusAmountOffset = (slot, category) => {
        const baseOffset = (() => {
            if (category.toLowerCase() === 'bows') {
                return bowBonusAmountOffset;
            } else if (category.toLowerCase() === 'shields') {
                return shieldBonusAmountOffset;
            } else {
                return weaponBonusAmountOffset;
            }
        })();

        return baseOffset + getBonusAmountLength(slot);
    };

    const foodBonusWidth = 16;
    const foodBonusDurationOffset = 0x000dcd98;
    const getFoodBonusDurationLength = (slots) => slots * foodBonusWidth;
    const getFoodBonusDurationOffset = (slot, category) => {
        return foodBonusDurationOffset + getFoodBonusDurationLength(slot);
    };
    const foodBonusTypeOffset = 0x000fa6b0;
    const getFoodBonusTypeLength = (slots) => slots * foodBonusWidth;
    const getFoodBonusTypeOffset = (slot, category) => {
        return foodBonusTypeOffset + getFoodBonusTypeLength(slot);
    };
    const foodBonusLevelOffset = 0x000fa6b8;
    const getFoodBonusLevelLength = (slots) => slots * foodBonusWidth;
    const getFoodBonusLevelOffset = (slot, category) => {
        return foodBonusLevelOffset + getFoodBonusLevelLength(slot);
    };

    return {
        getOffsets: (slot, slotInCategory, category) => {
            const canCalculateBonus = slotInCategory !== undefined && !!category;
            const canCalculateFoodBonus = !!canCalculateBonus && category == 'food';

            const bonus = (() => {
                if (canCalculateFoodBonus) {
                    return {
                        type: getFoodBonusTypeOffset(slotInCategory, category),
                        amount: getFoodBonusLevelOffset(slotInCategory, category),
                        duration: getFoodBonusDurationOffset(slotInCategory)
                    };
                } else if (canCalculateBonus) {
                    return {
                        type: getBonusTypeOffset(slotInCategory, category),
                        amount: getBonusAmountOffset(slotInCategory, category)
                    };
                } else {
                    return {};
                }
            })();

            return {
                item: getItemOffset(slot),
                quantity: getQuantitiesOffset(slot),
                equipped: getEquippedSlotOffset(slot),
                bonus: bonus
            };
        },
        getLengths: (slots, subsequentSlotsInCategory) => {
            return {
                item: getItemLength(slots),
                quantity: getQuantitiesLength(slots),
                equipped: getEquippedSlotLength(slots),
                bonus: {
                    type: getBonusTypeLength(subsequentSlotsInCategory),
                    amount: getBonusAmountLength(subsequentSlotsInCategory)
                }
            }
        }
    };
})();
