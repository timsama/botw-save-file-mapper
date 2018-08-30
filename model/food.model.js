module.exports = (() => {
    const Offsets = require('../offsets.js');
    const OffsetChecker = require('../offset-checker.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const mapItemSlots = require('./map-item-slots.js');
    const Float28 = require('../encoders_decoders/float28.js');
    const FoodDuration = require('../encoders_decoders/foodduration.js');

    const bonusTypes = {
        0x40000000: 'hearty',
        0x40800000: 'chilly',
        0x40a00000: 'spicy',
        0x40c00000: 'electro',
        0x41200000: 'mighty',
        0x41300000: 'tough',
        0x41400000: 'sneaky',
        0x41500000: 'hasty',
        0x41600000: 'energizing',
        0x41700000: 'enduring',
        0x41800000: 'fireproof'
    };

    const bonusAmounts = {
        0: 0,
        0x3f800000: 1,
        0x40000000: 2,
        0x40400000: 3
    };

    const getFoodSlots = (saveFile) => {
        return mapItemSlots(saveFile, 'food', (item, slot, slotInCategory) => {
            const quantitiesOffset = Offsets.getQuantitiesOffset(slot);
            const heartsOffset = Offsets.getFoodHeartsOffset(slotInCategory);

            const rawHearts = Float28.decode(OffsetChecker(heartsOffset, saveFile)) / 4.0;

            const bonus = (() => {
                const typeOffset = Offsets.getFoodBonusTypeOffset(slotInCategory);
                const amountOffset = Offsets.getFoodBonusAmountOffset(slotInCategory);
                const durationOffset = Offsets.getFoodBonusDurationOffset(slotInCategory);

                const type = bonusTypes[OffsetChecker(typeOffset, saveFile)];
                if (type === 'hearty') {
                    return {
                        amount: rawHearts,
                        type: type
                    };
                } else if (type === 'energizing') {
                    const amount = Float28.decode(OffsetChecker(amountOffset, saveFile)) / 1000.0;
                    return {
                        amount: amount,
                        type: type
                    }
                } else if (type === 'enduring') {
                    const amount = Float28.decode(OffsetChecker(amountOffset, saveFile)) / 5.0;
                    return {
                        amount: amount,
                        type: type
                    }
                } else if (type !== undefined) {
                    const amount = bonusAmounts[OffsetChecker(amountOffset, saveFile)];
                    const duration = FoodDuration.decode(OffsetChecker(durationOffset, saveFile)).toString();
                    return {
                        amount: amount,
                        type: type,
                        duration: duration
                    };
                } else {
                    return undefined;
                }
            })();

            const hearts = (bonus && bonus.type === 'hearty') ? 'fullrecovery' : rawHearts;

            return {
                name: item.name,
                stackable: item.stackable,
                quantity: OffsetChecker(quantitiesOffset, saveFile),
                hearts: hearts,
                bonus: bonus
            };
        });
    };

    return {
        read: (saveFile) => {
            return {
                slots: getFoodSlots(saveFile)
            };
        },
        write: (saveFile, modelJson) => {
            const slotStructure = getItemSlotStructure(saveFile);
            

        }
    };
})();