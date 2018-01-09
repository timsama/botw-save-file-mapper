var fs = require('fs');
var jBinary = require('jbinary');
var typeSet = {
  'word': ['array', 'uint32', 1]
};

const buildWriter = (type, binary) => {
    return (offset, val) => {
        binary.write(type, val, offset);
    };
};

const buildReader = (type, binary) => {
    return (offset) => {
        return binary.read(type, offset);
    };
};

jBinary.load('game_data.sav', typeSet, function (err, binary) {
    const writeToOffset = buildWriter('uint32', binary);
    const readAtOffset = buildReader('uint32', binary);

    const RUNES = {
        '0': 'roundBomb',
        '1': 'squareBomb',
        '2': 'magnesis',
        '3': 'stasis',
        '4': 'cryonis',
        '5': 'camera',
        '6': 'masterCycleZero',
        'roundBomb': 0,
        'squareBomb': 1,
        'magnesis': 2,
        'stasis': 3,
        'cryonis': 4,
        'camera': 5,
        'masterCycleZero': 6,
    };

    const runes = {
        'magnesis': readAtOffset(0x0007db78) === 1,
        'remoteBombs': readAtOffset(0x000096f8) === 1,
        'stasis': readAtOffset(0x00076100) === 1,
        'cryonis': readAtOffset(0x0005e630) === 1,
        'masterCycleZero': readAtOffset(0x000d2660) === 1,
        'selectedRune': RUNES[readAtOffset(0x000c3cc8)],
    };

    const keyItems = {
        'sheikahSlate': readAtOffset(0x000ce8e8) === 1,
        'paraglider': readAtOffset(0x000fa048) === 1,
    };

    const gameData = {
        'runes': runes,
        'keyItems': keyItems,
    };

    console.log(gameData);
});
