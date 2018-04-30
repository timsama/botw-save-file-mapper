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

    const bowBonusTypeOffsert = 0x00004990;
    const shieldBonusTypeOffset = 0x000d1038;
    const weaponBonusTypeOffset = 0x0005dd20;
    const bonusTypeWidth = 8;
    const getBonusTypeLength = (slots) => slots * bonusTypeWidth;
    const getBowBonusTypeOffset = (slot) => bowBonusTypeOffset + getBonusTypeLength(slot);
    const getShieldBonusTypeOffset = (slot) => shieldBonusTypeOffset + getBonusTypeLength(slot);
    const getWeaponBonusTypeOffset = (slot) => weaponBonusTypeOffset + getBonusTypeLength(slot);

    const bowBonusAmountOffset = 0x0000b1e0;
    const shieldBonusAmountOffset = 0x00071098;
    const weaponBonusAmountOffset = 0x000c4c68;
    const bonusAmountWidth = 8;
    const getBonusAmountLength = (slots) => slots * bonusAmountWidth;
    const getBowBonusAmountOffset = (slot) => bowBonusAmountOffset + getBonusAmountLength(slot);
    const getShieldBonusAmountOffset = (slot) => shieldBonusAmountOffset + getBonusAmountLength(slot);
    const getWeaponBonusAmountOffset = (slot) => weaponBonusAmountOffset + getBonusAmountLength(slot);

    return {
        getOffsets: (slot) => {
            return {
                item: getItemOffset(slot),
                quantity: getQuantitiesOffset(slot),
                equipped: getEquippedSlotOffset(slot),
                bowbonus: {
                    type: getBowBonusTypeOffset(slot),
                    amount: getBowBonusAmountOffset(slot)
                },
                shieldbonus: {
                    type: getShieldBonusTypeOffset(slot),
                    amount: getShieldBonusAmountOffset(slot)
                },
                weaponbonus: {
                    type: getWeaponBonusTypeOffset(slot),
                    amount: getWeaponBonusAmountOffset(slot)
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
