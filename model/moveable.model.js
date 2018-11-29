module.exports = (() => {
    return {
        read: (name, saveFile, changeReader) => {
            const keys = [
                `${name}.position.x`,
                `${name}.position.y`,
                `${name}.position.z`
            ];

            const mapValues = changeReader(keys);

            return {
                x: mapValues[`${name}.position.x`],
                y: mapValues[`${name}.position.y`],
                z: mapValues[`${name}.position.z`]
            };
        },
        write: (name, modelJson, saveFile, changeWriter, options) => {
            if (!modelJson) {
                return Promise.resolve();
            }

            const keys = [];

            const addKeyIfDefined = (val, key) => {
                if (val !== undefined) {
                    keys.push(key);
                }
            };

            addKeyIfDefined(modelJson.x, `${name}.position.x=${modelJson.x}`);
            addKeyIfDefined(modelJson.y, `${name}.position.y=${modelJson.y}`);
            addKeyIfDefined(modelJson.z, `${name}.position.z=${modelJson.z}`);

            return changeWriter(keys, options);
        }
    };
})();
