module.exports = () => {
    const assert = require('assert');
    const Runes = require('../../model/runes.model.js');
    const md5 = require('md5-file').sync;
    const fs = require('fs');
    const ModelTestUtils = require('./model-test-utils.js');

    const baseFilePath = './test/blank.sav';
    const testFilePath = './test/runes.test.sav';

    const expectedFile = './test/runes.model.spec.sav';

    const expectedJson = {
        "selectedIndex": 1,
        "enabled": true,
        "bombs": {
            "enabled": true,
            "plus": false
        },
        "stasis":  {
            "enabled": true,
            "plus": true
        },
        "sheikahsensor": {
            "enabled": false,
            "plus": false
        },
        "magnesis": {
            "enabled": true
        },
        "cryonis": {
            "enabled": true
        },
        "camera": {
            "enabled": true
        },
        "mastercyclezero": {
            "enabled": true
        },
    };

    return new Promise((resolve, reject) => {
        describe('runes.model.js', function() {
            after(function() {
                if (fs.existsSync(testFilePath)) {
                    fs.unlinkSync(testFilePath);
                }
            });

            it('should write the runes to the save file correctly', function() {
                fs.copyFileSync(baseFilePath, testFilePath);

                return Runes.write(expectedJson, testFilePath).then(() => {
                    // assert(md5(testFilePath) == md5(expectedFile), `${md5(testFilePath)} !== ${md5(expectedFile)}`);
                }).then(resolve);
            }).timeout(10000);

            it('should read the runes from the save file correctly', function() {
                const actualJson = Runes.read(testFilePath);

                ModelTestUtils.deepComparison(expectedJson, actualJson, 'runes');
            });
        });
    });    
};
