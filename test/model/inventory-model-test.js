module.exports = (() => {
    const assert = require('assert');
    const md5 = require('md5-file').sync;
    const fs = require('fs');
    const ModelTestUtils = require('./model-test-utils.js');
    const baseFilePath = './test/blank.sav';
    
    return (modelName, modelJson, useSeededBaseFile) => {
        const Model = require(`../../model/${modelName}.model.js`);
        const testFilePath = `./test/${modelName}.test.sav`;
        const expectedFile = `./test/${modelName}.model.spec.sav`;
        
        describe(`${modelName}.model.js`, function() {
            afterEach(function() {
                if (fs.existsSync(testFilePath)) {
                    fs.unlinkSync(testFilePath);
                }
            });

            it(`should write the ${modelName} to the save file correctly`, function() {
                fs.copyFileSync(baseFilePath, testFilePath);

                Model.write(modelJson, testFilePath);
                
                assert(md5(testFilePath) == md5(expectedFile), `${md5(testFilePath)} !== ${md5(expectedFile)}`);
            }).timeout(10000);

            it(`should read the ${modelName} from the save file correctly`, function() {
                const actualJson = Model.read(expectedFile);

                assert(ModelTestUtils.deepComparison(modelJson, actualJson, modelName));
            });
        });
    };
})();
