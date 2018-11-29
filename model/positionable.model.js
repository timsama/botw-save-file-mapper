module.exports = (() => {
    return {
        read: (name, saveFile, keypathReader, changeReader) => {
            const keys = [
                `${name}.position.x`,
                `${name}.position.y`,
                `${name}.position.z`,
                `${name}.position.orientation`
            ];

            const canMount = !!keypathReader(`${name}.mounted`);
            if (canMount) {
                keys.push(`${name}.mounted.set`);
            }

            const mapValues = changeReader(keys);

            const isRadians = keypathReader(`${name}.position.orientation.entries`).some((entry) => {
                return entry['unit'] === 'radians';
            });

            const getDegrees = (radians) => {
                return (radians * 180.0) / Math.PI;
            };

            const convertIfNeeded = (angle) => {
                if (isRadians) {
                    return getDegrees(angle);
                } else {
                    return angle;
                }
            };

            const positionable = {
                orientation: convertIfNeeded(mapValues[`${name}.position.orientation`]),
                x: mapValues[`${name}.position.x`],
                y: mapValues[`${name}.position.y`],
                z: mapValues[`${name}.position.z`]
            };

            if (canMount) {
                positionable.mounted = mapValues[`${name}.mounted.set`];
            }

            return positionable;
        },
        write: (name, modelJson, saveFile, keypathReader, changeWriter, options) => {
            if (!modelJson) {
                return Promise.resolve();
            }

            const keys = [];

            const addKeyIfDefined = (val, key) => {
                if (val !== undefined) {
                    keys.push(key);
                }
            };

            const addKeyBranches = (val, baseKey, extensionTrue, extensionFalse) => {
                if (val === true) {
                    keys.push(`${baseKey}.${extensionTrue}`);
                }
                if (val === false) {
                    keys.push(`${baseKey}.${extensionFalse}`);
                }
            };

            const isRadians = keypathReader(`${name}.position.orientation.entries`).some((entry) => {
                return entry['unit'] === 'radians';
            });

            const getRadians = (degrees) => {
                return (degrees * Math.PI) / 180.0;
            };

            const convertIfNeeded = (degrees) => {
                if (isRadians) {
                    return getRadians(degrees);
                } else {
                    return degrees;
                }
            };

            const orientation = convertIfNeeded(modelJson.orientation);
            addKeyIfDefined(modelJson.orientation, `${name}.position.orientation=${orientation}`);
            addKeyIfDefined(modelJson.x, `${name}.position.x=${modelJson.x}`);
            addKeyIfDefined(modelJson.y, `${name}.position.y=${modelJson.y}`);
            addKeyIfDefined(modelJson.z, `${name}.position.z=${modelJson.z}`);
            addKeyBranches(modelJson.mounted, 'link.mounted', 'set', 'unset');

            return changeWriter(keys, options);
        }
    };
})();
