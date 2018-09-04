module.exports = (() => {
    const CONFIG = require('../config.js');
    const changeReader = require('../read-changes.js');
    const changeWriter = require('../apply-changes.js');
    const HoursMinutesSeconds = require('../encoders_decoders/hoursminutesseconds.js');
    const TimeOfDay = require('../encoders_decoders/timeofday.js');

    const defaultEffectMap = `${CONFIG.exportpath}effectmap.json`;

    const getChangeReader = (saveFile, effectMapPath) => {
        return (keys, withLogging) => {
            return changeReader(saveFile)(effectMapPath || defaultEffectMap, keys, withLogging);
        };
    };
    const getChangeWriter = (saveFile, effectMapPath) => {
        return (keys, skipSoftDependencies, withLogging) => {
            return changeWriter(saveFile, true)(effectMapPath || defaultEffectMap, keys, skipSoftDependencies, withLogging);
        };
    };

    return {
        read: (saveFile, effectMapPath) => {
            const readChanges = getChangeReader(saveFile, effectMapPath);

            const mapValues = readChanges([
                'time.specific',
                'bloodmoon.counter',
                'bloodmoon.tonight.set'
            ]);

            return {
                time: TimeOfDay.decode(mapValues['time.specific']).toString(),
                bloodmoon: {
                    counter: HoursMinutesSeconds.decode(mapValues['bloodmoon.counter']).toString(),
                    tonight: mapValues['bloodmoon.tonight.set']
                }
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            const writeChanges = getChangeWriter(saveFile, effectMapPath);

            const keys = [
                `time.specific=${TimeOfDay.encode(modelJson.time)}`,
                `bloodmoon.counter=${HoursMinutesSeconds.encode(modelJson.bloodmoon.counter)}`,
            ];

            const addKeyIfTrue = (val, key) => {
                if (val === true) {
                    keys.push(key);
                }
            };

            addKeyIfTrue(modelJson.bloodmoon.tonight, 'bloodmoon.tonight.set');
            addKeyIfTrue(!modelJson.bloodmoon.tonight, 'bloodmoon.tonight.unset');

            return writeChanges(keys);
        }
    };
})();