module.exports = (() => {
    const assert = require('assert');

    const doKeysMatch = (expectedObj, actualObj, path) => {
        if (Array.isArray(expectedObj)) {
            return expectedObj.length === actualObj.length;
        } else {
            const missingKeys = Object.keys(expectedObj).filter(key => {
                if (actualObj === undefined) {
                    return true;
                } else {
                    return !actualObj.hasOwnProperty(key) && expectedObj[key] !== undefined;
                }
            });
            const allExpectedKeysPresent = missingKeys.length == 0;

            missingKeys.forEach(missingKey => {
                assert(allExpectedKeysPresent, `An expected key was missing: '${path}.${missingKey}'`);
            });

            const unexpectedKeys = Object.keys(actualObj).filter(key => !expectedObj.hasOwnProperty(key) && actualObj[key] !== undefined);
            const noUnexpectedKeysPresent = unexpectedKeys.length == 0;

            unexpectedKeys.forEach(unexpectedKey => {
                console.log(`${path}.${unexpectedKey} = ${actualObj[unexpectedKey]}`);
                Object.keys(actualObj[unexpectedKey]).forEach(key => {
                    console.log(`${path}.${unexpectedKey}.${key}. = ${actualObj[unexpectedKey][key]}`);
                });
                assert(noUnexpectedKeysPresent, `An unexpected key was present: '${path}.${unexpectedKey}'`);
            });

            return allExpectedKeysPresent && noUnexpectedKeysPresent;
        }
    };

    const doValuesMatch = (expectedObj, actualObj, path) => {
        if (Array.isArray(expectedObj)) {
            return expectedObj.every((exp, i) => {
                return deepComparison(exp, actualObj[i], `${path}[${i}]`);
            });
        } else {
            const mismatchedValueKeys = Object.keys(expectedObj).filter(key => {
                const expectedValue = expectedObj[key];
                const actualValue = actualObj[key];

                if (Array.isArray(expectedValue)) {
                    return expectedValue.some((val, i) => {
                        if (typeof val === 'object') {
                            return !deepComparison(val, actualValue[i], `${path}.${key}[${i}]`);
                        } else {
                            return val !== actualValue[i];
                        }
                    });
                } else if (typeof expectedValue === 'object') {
                    return !deepComparison(expectedValue, actualValue, `${path}.${key}`);
                } else {
                    return expectedValue !== actualValue;
                }
            });

            const allValuesMatch = mismatchedValueKeys.length == 0;

            mismatchedValueKeys.forEach(key => {
                assert.equal(expectedObj[key], actualObj[key], `Mismatch at '${path}.${key}'`);
            });

            return allValuesMatch;
        }
    };

    const deepComparison = (expectedObj, actualObj, path) => {
        const shouldCheckValues = doKeysMatch(expectedObj, actualObj, path);

        return shouldCheckValues && doValuesMatch(expectedObj, actualObj, path);
    };

    return {
        deepComparison: deepComparison,
        doKeysMatch: doKeysMatch,
        doValuesMatch: doValuesMatch
    };
})();
