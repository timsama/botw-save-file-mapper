const float32 = require('../encoders_decoders/float32.js');

const inputs = process.argv.slice(2);

inputs.forEach((input) => {
    console.log(float32.decode(input));
});
