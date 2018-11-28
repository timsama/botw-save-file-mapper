const float28 = require('../encoders_decoders/float28.js');

const inputs = process.argv.slice(2);

inputs.forEach((input) => {
    console.log(float28.decodeFloat(input));
});
