const float12 = require('./float12.js');

module.exports = (() => {
    return (value) => {
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
    };
})();