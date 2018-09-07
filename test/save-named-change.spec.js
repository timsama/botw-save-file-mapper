const assert = require('assert');
const saveNamedChange = require('../lib/save-named-change.js')('./test/save-named-change.spec.sav');
const fs = require('fs');
const mapFileUtils = require('../util/map-file-utils.js');

const expectedJsonFile = './test/save-named-change.spec.json';
const actualJsonFile = './test/test.json';

describe('save-named-change.js', function() {
    afterEach(function() {
        fs.unlinkSync(actualJsonFile);
    });

    it('should export the change\'s JSON to a mapfile', function() {
        const offsets = [
            0x000C3BF0,
            0x000C3BF8,
            0x000C3C00
        ];

        saveNamedChange(actualJsonFile, 'testPosition', offsets);

        const expectedJson = mapFileUtils.getFileAsJsonOrEmptyJsObject(expectedJsonFile);
        const actualJson = mapFileUtils.getFileAsJsonOrEmptyJsObject(actualJsonFile);

        assert.deepEqual(actualJson, expectedJson, 'exported JSON was not equivalent!');
    });
});