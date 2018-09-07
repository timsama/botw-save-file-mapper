const assert = require('assert');
const testSingles = require('../lib/test-singles.js');
const offsetChecker = require('../lib/offset-checker.js');
const CONFIG = require('../config.json');
const effectmapFilePath = `${CONFIG.mapfilepath}effectmap.json`;

const checkTest = (name, expectedOffset, expectedValue) => {
    const queryFunc = () => {
        const value = offsetChecker(expectedOffset, `${CONFIG.savepath}game_data.sav`);
        return value === expectedValue;
    };
    const filename = `./test/resources/${name}.raw.changes`;

    const results = testSingles(name, undefined, expectedValue, undefined, false, true, () => false, [], queryFunc, true, filename);

    assert(results.length === 1, `too many results returned: ${results}.length !== 1 (expected)`);
    assert(results[0].offset === expectedOffset, `wrong offset returned. ${results[0].offset} !== ${expectedOffset} (expected)`);
    assert(results[0].value === expectedValue, `wrong value returned. ${results[0].value} !== ${expectedValue} (expected)`);
};

describe('test-singles.js', function() {
    it('should correctly identify shrines.maaghalan.found', function() {
        const name = 'shrines.maaghalan.found';
        const expectedOffset = 512672;
        const expectedValue = 1;
        
        checkTest(name, expectedOffset, expectedValue);
    });

    it('should correctly identify shrines.maaghalan.active', function() {
        const name = 'shrines.maaghalan.active';
        const expectedOffset = 553416;
        const expectedValue = 1;
        
        checkTest(name, expectedOffset, expectedValue);
    });

    it('should correctly identify shrines.maaghalan.complete', function() {
        const name = 'shrines.maaghalan.complete';
        const expectedOffset = 46696;
        const expectedValue = 1;
        
        checkTest(name, expectedOffset, expectedValue);
    });
});
