module.exports = (() => {
    return {
        read: (name, saveFile, keypathReader, changeReader) => {
            let keysToRead = [
                `memories.${name}.remembered`
            ];

            const mapValues = changeReader(keysToRead);

            return {
                remembered: mapValues[`memories.${name}.remembered`]
            };
        },
        write: (name, modelJson, saveFile, keypathReader, changeWriter) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const keys = [];

            const addKeyIfTrue = (val, key) => {
                if (val === true) {
                    keys.push(key);
                }
            };

            addKeyIfTrue(modelJson.remembered, `memories.${name}.remembered`);
            addKeyIfTrue(!modelJson.remembered, `memories.${name}.forgotten`);

            return changeWriter(keys);
        }
    };
})();
