module.exports = (() => {
    return {
        encode: (time) => {
            const seconds = ((time) => {
                if (time.toString().indexOf(':') === -1) {
                    return time;
                } else {
                    const [seconds, minutes, hours] = (time).toString()
                        .split(':').reverse().map(x => parseInt(x)).concat([0, 0, 0]);
                    return hours * 3600 + minutes * 60 + seconds;
                }
            })(time);
            
            return seconds;
        },
        decode: (totalSeconds) => {
            const seconds = Math.floor(totalSeconds % 60);
            const rawminutes = Math.floor(totalSeconds / 60);
            const minutes = Math.floor(rawminutes % 60);
            const hours = Math.floor(rawminutes / 60);

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
                hours: hours,
                toString: () => {
                    if (hours > 0) {
                        return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
                    } else {
                        return `${padNumber(minutes)}:${padNumber(seconds)}`;
                    }
                }
            };
        }
    };
})();