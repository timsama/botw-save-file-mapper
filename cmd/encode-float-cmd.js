const float28 = require('../encoders_decoders/float28.js');
const saveFileUtils = require('../util/save-file-utils.js');

const inputs = process.argv.slice(2);

inputs.forEach((input) => {
    console.log(saveFileUtils.toHexString(float28.encode(input)));
});