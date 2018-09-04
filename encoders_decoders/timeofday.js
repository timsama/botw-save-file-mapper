module.exports = (() => {
    return {
        encode: (time) => {
            if (time.toString().indexOf(':') === -1) {
                return time;
            } else {
                const [hoursmins, ampm] = time.toString().split(' ');
                const [minutes, hours] = hoursmins.split(':').reverse().map(x => parseInt(x)).concat([0, 0]);

                const finalHours = (() => {
                    if (ampm.toUpperCase() === 'PM') {
                        return hours + 12;
                    } else if (hours === 12 && ampm.toUpperCase() === 'AM') {
                        return hours - 12;
                    } else {
                        return hours;
                    }
                })();

                return Math.round((finalHours * 60 + minutes) / 4.0);
            }
        },
        decode: (value) => {
            const roundToNearest5 = (minutes) => {
                return Math.round((minutes - 1) / 5.0) * 5;
            };

            const rawminutes = value * 4;
            const minutes = roundToNearest5(rawminutes % 60);
            const rawhours = Math.floor(rawminutes / 60);

            const [hours, ampm] = (() => {
                if (rawhours === 12) {
                    return [rawhours, 'PM'];
                } else if (rawhours > 12) {
                    return [rawhours - 12, 'PM'];
                } else if (rawhours === 0) {
                    return [rawhours + 12, 'AM'];
                } else {
                    return [rawhours, 'AM'];
                }
            })();

            const padNumber = (val) => {
                const str = val.toString();
                if (str.length < 2) {
                    return `0${str}`;
                } else {
                    return str;
                }
            };

            return {
                totalMinutes: rawminutes,
                minutes: minutes,
                hours: hours,
                toString: () => {
                    return `${padNumber(hours)}:${padNumber(minutes)} ${ampm}`;
                }
            };
        }
    };
})();