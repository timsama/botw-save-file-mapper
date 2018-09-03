module.exports = (() => {
    const assert = require('assert');
    const md5 = require('md5-file').sync;
    const fs = require('fs');
    const ModelTestUtils = require('./model-test-utils.js');
    const baseFilePath = './test/blank.sav';
    
    return async (modelName, modelJson) => {
        return new Promise((resolve, reject) => {
            const Model = require(`../../model/${modelName}.model.js`);
            const testFilePath = `./test/${modelName}.test.sav`;
            const expectedFile = `./test/${modelName}.model.spec.sav`;

            beforeEach(function() {
                fs.copyFileSync(baseFilePath, testFilePath);
            });
            
            describe(`${modelName}.model.js`, function() {
                after(function() {
                    if (fs.existsSync(testFilePath)) {
                        fs.unlinkSync(testFilePath);
                    }
                    resolve();
                });

                it(`should write and read the ${modelName} to/from the save file correctly`, function() {
                    // test the read method
                    const actualJson = Model.read(expectedFile, 0);

                    // comment this out when using this to generate a new .model.spec.sav file, or it will never get written
                    assert(ModelTestUtils.deepComparison(modelJson, actualJson, modelName));

                    // test the write method
                    return Model.write(modelJson, testFilePath, 0)
                        .then(() => {
                            const actualJson = Model.read(testFilePath, 0);

                            assert(ModelTestUtils.deepComparison(modelJson, actualJson, modelName));
                        });
                }).timeout(10000);
            });
        }); 
    };
})();
