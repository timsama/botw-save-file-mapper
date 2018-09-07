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
        write: (name, modelJson, saveFile, keypathReader, changeWriter, options) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const keys = [];

            const addKeyBranches = (val, baseKey, extensionTrue, extensionFalse) => {
                if (val === true) {
                    keys.push(`${baseKey}.${extensionTrue}`);
                }
                if (val === false) {
                    keys.push(`${baseKey}.${extensionFalse}`);
                }
            };

            addKeyBranches(modelJson.remembered, `memories.${name}`, 'remembered', 'forgotten');

            return changeWriter(keys, options);
        }
    };
})();
