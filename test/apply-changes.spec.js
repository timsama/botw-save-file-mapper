const assert = require('assert');
const applyChanges = require('../apply-changes.js')('./test/test.sav');
const fs = require('fs');
const CONFIG = require('../config.js');
const md5 = require('md5-file').sync;
const effectmapFilePath = `./test/testeffectmap.json`;

const baseFilePath = './test/blank.sav';
const testFilePath = './test/test.sav';
const singleExpectedFile = './test/apply-changes.spec.single.sav';
const multipleExpectedFile = './test/apply-changes.spec.multiple.sav';
const skipSoftDependenciesExpectedFile = './test/apply-changes.spec.skipsoftdependencies.sav';
const withDependenciesExpectedFile = './test/apply-changes.spec.withdependencies.sav';

describe('apply-changes.js', function() {
    afterEach(function() {
        fs.unlinkSync(testFilePath);
    });

    it('should apply singular changes', function() {
        fs.copyFileSync(baseFilePath, testFilePath);
        applyChanges(effectmapFilePath, ['runes.bombs']);
        
        assert(md5(testFilePath) == md5(singleExpectedFile), `${md5(testFilePath)} !== ${md5(singleExpectedFile)}`);
    });

    it('should apply multiple changes', function() {
        fs.copyFileSync(baseFilePath, testFilePath);
        applyChanges(effectmapFilePath, [
            'mainquests.followthesheikahslate.begun',
            'runes.bombs',
            'runes.cryonis',
            'runes.mastercyclezero',
            'shrines.hadahamar.found',
            'shrines.hadahamar.active'
        ]);
        
        assert(md5(testFilePath) == md5(multipleExpectedFile), `${md5(testFilePath)} !== ${md5(multipleExpectedFile)}`);
    });

    it('should apply both changes and their dependencies', function() {
        fs.copyFileSync(baseFilePath, testFilePath);
        applyChanges(effectmapFilePath, ['shrines.hadahamar.complete']);
        
        assert(md5(testFilePath) == md5(withDependenciesExpectedFile), `${md5(testFilePath)} !== ${md5(withDependenciesExpectedFile)}`);
    });

    it('should skip soft dependencies of a change when specified', function() {
        fs.copyFileSync(baseFilePath, testFilePath);
        applyChanges(effectmapFilePath, ['shrines.hadahamar.complete'], true);
        
        assert(md5(testFilePath) == md5(skipSoftDependenciesExpectedFile), `${md5(testFilePath)} !== ${md5(skipSoftDependenciesExpectedFile)}`);
    });
});
