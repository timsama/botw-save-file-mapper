const float28 = require('./encoders_decoders/float28.js');
const saveFileUtils = require('./util/save-file-utils.js');

const input = process.argv[2];

console.log(saveFileUtils.toHexString(float28.encode(input)));