const float32 = require('../encoders_decoders/float32.js');
const saveFileUtils = require('../util/save-file-utils.js');

const inputs = process.argv.slice(2);

inputs.forEach((input) => {
    console.log(saveFileUtils.toHexString(float32.encode(input)));
});