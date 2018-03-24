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

    const bonusTypeOffset = 0x0005dd20;
    const bonusTypeWidth = 8;
    const getBonusTypeLength = (slots) => slots * bonusTypeWidth;
    const getBonusTypeOffset = (slot) => bonusTypeOffset + getBonusTypeLength(slot);

    const bonusAmountOffset = 0x000c4c68;
    const bonusAmountWidth = 8;
    const getBonusAmountLength = (slots) => slots * bonusAmountWidth;
    const getBonusAmountOffset = (slot) => bonusAmountOffset + getBonusAmountLength(slot);

    return {
        getOffsets: (slot) => {
            return {
                item: getItemOffset(slot),
                quantity: getQuantitiesOffset(slot),
                equipped: getEquippedSlotOffset(slot),
                bonus: {
                    type: getBonusTypeOffset(slot),
                    amount: getBonusAmountOffset(slot)
                }
            };
        },
        getLengths: (slots) => {
            return {
                item: getItemLength(slots),
                quantity: getQuantitiesLength(slots),
                equipped: getEquippedSlotLength(slots),
                bonus: {
                    type: getBonusTypeLength(slots),
                    amount: getBonusAmountLength(slots)
                }
            }
        }
    };
})();
