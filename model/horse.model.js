module.exports = (() => {
    return {
        read: (keyName, saveFile, keypathReader, changeReader) => {
            let keysToRead = [
                `horses.${keyName}.type`,
                `horses.${keyName}.saddle`,
                `horses.${keyName}.reins`,
                `horses.${keyName}.mane`,
                `horses.${keyName}.color`,
                `horses.${keyName}.bond`
            ];

            if (keyName !== 'wild') {
                keysToRead.push(`horses.${keyName}.name`);
            }

            const mapValues = changeReader(keysToRead);

            if (!mapValues[`horses.${keyName}.type`]) {
                return undefined;
            } else {
                return {
                    name: mapValues[`horses.${keyName}.name`],
                    type: mapValues[`horses.${keyName}.type`],
                    saddle: mapValues[`horses.${keyName}.saddle`],
                    reins: mapValues[`horses.${keyName}.reins`],
                    mane: mapValues[`horses.${keyName}.mane`],
                    color: mapValues[`horses.${keyName}.color`],
                    bond: mapValues[`horses.${keyName}.bond`] * 100.0
                };
            }
        },
        write: (keyName, modelJson, saveFile, keypathReader, changeWriter, options) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const keys = [];

            const addKeyIfDefined = (val, key) => {
                if (val !== undefined) {
                    keys.push(key);
                }
            };

            addKeyIfDefined(modelJson.name, `horses.${keyName}.name=${modelJson.name}`);
            addKeyIfDefined(modelJson.type, `horses.${keyName}.type=${modelJson.type}`);
            addKeyIfDefined(modelJson.saddle, `horses.${keyName}.saddle=${modelJson.saddle}`);
            addKeyIfDefined(modelJson.reins, `horses.${keyName}.reins=${modelJson.reins}`);
            addKeyIfDefined(modelJson.mane, `horses.${keyName}.mane=${modelJson.mane}`);
            addKeyIfDefined(modelJson.color, `horses.${keyName}.color=${modelJson.color}`);
            addKeyIfDefined(modelJson.bond, `horses.${keyName}.bond=${modelJson.bond / 100.0}`);

            return changeWriter(keys, options);
        }
    };
})();
