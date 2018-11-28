const Float32 = require('./float32.js');
const HoursMinutesSeconds = require('./hoursminutesseconds.js');

module.exports = (() => {
    return {
        encode: (time) => {            
            return Float32.encode(HoursMinutesSeconds.encode(time));
        },
        decode: (value) => {
            const totalSeconds = Float32.decode(value);
            return HoursMinutesSeconds.decode(totalSeconds);
        }
    };
})();