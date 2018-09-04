const Float28 = require('./float28.js');
const HoursMinutesSeconds = require('./hoursminutesseconds.js');

module.exports = (() => {
    return {
        encode: (time) => {            
            return Float28.encode(HoursMinutesSeconds.encode(time));
        },
        decode: (value) => {
            const totalSeconds = Float28.decode(value);
            return HoursMinutesSeconds.decode(totalSeconds);
        }
    };
})();