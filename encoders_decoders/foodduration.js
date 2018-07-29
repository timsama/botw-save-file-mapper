const float12 = require('./float12.js');

module.exports = (() => {
    return {
        encode: (time) => {
            const seconds = ((time) => {
                if (time.toString().indexOf(':') === -1) {
                    return time;
                } else {
                    const [minutes, seconds] = time.split(':').map(x => parseInt(x));
                    return minutes * 60 + seconds;
                }
            })(time);
            
            return (0x4 << 28) | float12.encode(seconds);
        },
        decode: (value) => {
            const totalSeconds = float12.decode(value);

            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.floor(totalSeconds % 60);

            const padNumber = (val) => {
                const str = val.toString();
                if (str.length < 2) {
                    return `0${str}`;
                } else {
                    return str;
                }
            };

            return {
                totalSeconds: totalSeconds,
                minutes: minutes,
                seconds: seconds,
                toString: () => {
                    return `${padNumber(minutes)}:${padNumber(seconds)}`;
                }
            };
        }
    };
})();