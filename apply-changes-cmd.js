const applyChanges = require('./apply-changes.js');

const names = process.argv.slice(2) || ['unnamed'];

applyChanges(names);
