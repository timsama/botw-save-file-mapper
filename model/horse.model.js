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
        }
    };
})();
