const asciiReader = require('../lib/read-ascii-at-offset.js')();


const offset = parseInt(process.argv[2]);
const length = parseInt(process.argv[3]);

console.log(asciiReader(offset, length));
