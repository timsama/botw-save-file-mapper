const assert = require('assert');
const offsetChecker = require('../lib/offset-checker.js');

describe('offset-checker.js', function() {
    it('should return what is at the specified offset in a save file', function() {
        assert.equal(offsetChecker(0x0006ea68, './test/offset-checker.spec.sav'), 0x430b825d, 'Known value at offset 0x0006ea68 was not read as expected');
    });
});
