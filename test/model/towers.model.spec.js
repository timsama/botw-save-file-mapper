// module.exports = () => {
//     const assert = require('assert');
//     const Towers = require('../../model/towers.model.js');
//     const md5 = require('md5-file').sync;
//     const fs = require('fs');
//     const ModelTestUtils = require('./model-test-utils.js');

//     const baseFilePath = './test/blank.sav';
//     const testFilePath = './test/towers.test.sav';

//     const expectedFile = './test/towers.model.spec.sav';

//     const expectedJson = {
//         "all": { "unearthed": true },
//         "akkala": { "active": false, "found": false },
//         "central": { "active": true, "found": true },
//         "duelingpeaks": { "active": false, "found": true },
//         "eldin": { "active": true, "found": true },
//         "faron": { "active": true, "found": true },
//         "gerudo": { "active": true, "found": true },
//         "greatplateau": { "active": true, "found": true },
//         "hateno": { "active": true, "found": true },
//         "hebra": { "active": true, "found": true },
//         "lake": { "active": true, "found": true },
//         "lanayru": { "active": true, "found": true },
//         "ridgeland": { "active": false, "found": false },
//         "tabantha": { "active": false, "found": false },
//         "wasteland": { "active": false, "found": false },
//         "woodland": { "active": false, "found": false }
//     };

//     return new Promise((resolve, reject) => {
//         describe('towers.model.js', function() {
//             afterEach(function() {
//                 if (fs.existsSync(testFilePath)) {
//                     fs.unlinkSync(testFilePath);
//                 }
//             });

//             it('should write the towers to the save file correctly', function() {
//                 fs.copyFileSync(baseFilePath, testFilePath);

//                 return Towers.write(expectedJson, testFilePath).then(() => {
//                     assert(md5(testFilePath) == md5(expectedFile), `${md5(testFilePath)} !== ${md5(expectedFile)}`);
//                 }).then(resolve);
//             }).timeout(10000);

//             it('should read the towers from the save file correctly', function() {
//                 const actualJson = Towers.read(testFilePath);

//                 ModelTestUtils.deepComparison(expectedJson, actualJson, 'towers');
//             });
//         });
//     });    
// };
