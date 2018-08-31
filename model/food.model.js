module.exports = (() => {
    const Offsets = require('../offsets.js');
    const OffsetChecker = require('../offset-checker.js');
    const OffsetSetter = require('../offset-setter.js');
    const getItemSlotStructure = require('../get-item-slot-structure.js');
    const mapItemSlots = require('./map-item-slots.js');
    const writeItemSlots = require('./write-item-slots.js');
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

    const typeEnum = {
        'none': 0xbf800000,
        'hearty': 0x40000000,
        'chilly': 0x40800000,
        'spicy': 0x40a00000,
        'electro': 0x40c00000,
        'mighty': 0x41200000,
        'tough': 0x41300000,
        'sneaky': 0x41400000,
        'hasty': 0x41500000,
        'energizing': 0x41600000,
        'enduring': 0x41700000,
        'fireproof': 0x41800000
    };

    const amountsEnum = {
        0: 0,
        1: 0x3f800000,
        2: 0x40000000,
        3: 0x40400000
    };

    const getFoodSlots = (saveFile) => {
        return mapItemSlots(saveFile, 'food', (item, slot, slotInCategory) => {
            const quantitiesOffset = Offsets.getQuantitiesOffset(slot);
            const heartsOffset = Offsets.getFoodHeartsOffset(slotInCategory);

            const quarterHearts = Float28.decode(OffsetChecker(heartsOffset, saveFile));
            const fullHearts = quarterHearts / 4.0;

            const bonus = (() => {
                if (item.name.slice(0, 6) === 'frozen' || item.name.slice(0, 3) === 'icy') {
                    return {
                        amount: 1,
                        type: 'chilly',
                        duration: '01:00'
                    };
                }

                const typeOffset = Offsets.getFoodBonusTypeOffset(slotInCategory);
                const amountOffset = Offsets.getFoodBonusAmountOffset(slotInCategory);
                const durationOffset = Offsets.getFoodBonusDurationOffset(slotInCategory);

                const type = bonusTypes[OffsetChecker(typeOffset, saveFile)];
                if (type === 'hearty') {
                    return {
                        amount: fullHearts,
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

            const nonStackableHearts = (bonus && bonus.type === 'hearty') ? 'fullrecovery' : fullHearts;
            const hearts = item.stackable ? item.hearts : nonStackableHearts;

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
        write: (modelJson, saveFile) => {
            writeItemSlots(saveFile, modelJson.slots, 'food', (item, slot, slotInCategory) => {
                const quantitiesOffset = Offsets.getQuantitiesOffset(slot);
                const heartsOffset = Offsets.getFoodHeartsOffset(slotInCategory);
                const typeOffset = Offsets.getFoodBonusTypeOffset(slotInCategory);
                const amountOffset = Offsets.getFoodBonusAmountOffset(slotInCategory);
                const durationOffset = Offsets.getFoodBonusDurationOffset(slotInCategory);

                const fullHearts = (item.bonus && item.bonus.type === 'hearty') ? item.bonus.amount : item.hearts;
                const quarterHearts = fullHearts * 4;

                if (!item.stackable) {
                    OffsetSetter(heartsOffset, Float28.encode(quarterHearts), saveFile);
                    OffsetSetter(quantitiesOffset, 1, saveFile);
                } else {
                    OffsetSetter(heartsOffset, 0xbf800000, saveFile);
                    OffsetSetter(quantitiesOffset, item.quantity, saveFile);
                }

                if (!!item.bonus && !!item.bonus.type && !!item.bonus.amount) {
                    OffsetSetter(typeOffset, typeEnum[item.bonus.type], saveFile);

                    if (item.bonus.type === 'energizing') {
                        OffsetSetter(amountOffset, Float28.encode(item.bonus.amount * 1000), saveFile);
                        OffsetSetter(durationOffset, 0, saveFile);
                    } else if (item.bonus.type === 'enduring') {
                        OffsetSetter(amountOffset, Float28.encode(item.bonus.amount * 5.0), saveFile);
                        OffsetSetter(durationOffset, 0, saveFile);
                    } else if (item.bonus.type === 'hearty') {
                        OffsetSetter(amountOffset, Float28.encode(quarterHearts), saveFile);
                        OffsetSetter(durationOffset, 0, saveFile);
                    } else if (!!item.bonus.duration) {
                        OffsetSetter(amountOffset, amountsEnum[item.bonus.amount], saveFile);
                        OffsetSetter(durationOffset, FoodDuration.encode(item.bonus.duration), saveFile);
                    } else {
                        OffsetSetter(typeOffset, typeEnum['none'], saveFile);
                        OffsetSetter(amountOffset, 0, saveFile);
                        OffsetSetter(durationOffset, 0, saveFile);
                    }
                } else {
                    OffsetSetter(typeOffset, typeEnum['none'], saveFile);
                    OffsetSetter(amountOffset, 0, saveFile);
                    OffsetSetter(durationOffset, 0, saveFile);
                }
            });
        }
    };
})();