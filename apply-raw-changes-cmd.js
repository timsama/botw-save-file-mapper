const applyChanges = require('./apply-raw-changes.js');

const names = process.argv.slice(2) || ['unnamed'];

applyChanges(names);
