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
            } else if (category.toLowerCase() === 'weapons') {
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
            } else if (category.toLowerCase() === 'weapons') {
                return weaponBonusAmountOffset;
            }
        })();

        return baseOffset + getBonusAmountLength(slot);
    };

    const foodWidth = 16;
    const foodHeartsOffset = 0x000dcd90;
    const getFoodHeartsLength = (slots) => slots * foodWidth;
    const getFoodHeartsOffset = (slot) => {
        return foodHeartsOffset + getFoodHeartsLength(slot);
    };
    const foodBonusDurationOffset = 0x000dcd98;
    const getFoodBonusDurationLength = (slots) => slots * foodWidth;
    const getFoodBonusDurationOffset = (slot) => {
        return foodBonusDurationOffset + getFoodBonusDurationLength(slot);
    };
    const foodBonusTypeOffset = 0x000fa6b0;
    const getFoodBonusTypeLength = (slots) => slots * foodWidth;
    const getFoodBonusTypeOffset = (slot) => {
        return foodBonusTypeOffset + getFoodBonusTypeLength(slot);
    };
    const foodBonusAmountOffset = 0x000fa6b8;
    const getFoodBonusAmountLength = (slots) => slots * foodWidth;
    const getFoodBonusAmountOffset = (slot) => {
        return foodBonusAmountOffset + getFoodBonusAmountLength(slot);
    };

    return {
        getItemOffset: getItemOffset,
        getQuantitiesLength: getQuantitiesLength,
        getQuantitiesOffset: getQuantitiesOffset,
        getEquippedSlotLength: getEquippedSlotLength,
        getEquippedSlotOffset: getEquippedSlotOffset,
        getBonusTypeLength: getBonusTypeLength,
        getBonusTypeOffset: getBonusTypeOffset,
        getBonusAmountLength: getBonusAmountLength,
        getBonusAmountOffset: getBonusAmountOffset,
        getFoodHeartsLength: getFoodHeartsLength,
        getFoodHeartsOffset: getFoodHeartsOffset,
        getFoodBonusDurationLength: getFoodBonusDurationLength,
        getFoodBonusDurationOffset: getFoodBonusDurationOffset,
        getFoodBonusTypeLength: getFoodBonusTypeLength,
        getFoodBonusTypeOffset: getFoodBonusTypeOffset,
        getFoodBonusAmountLength: getFoodBonusAmountLength,
        getFoodBonusAmountOffset: getFoodBonusAmountOffset
    };    
})();