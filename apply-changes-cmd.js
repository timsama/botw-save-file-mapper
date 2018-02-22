const CONFIG = require('./config.js');
const applyChanges = require('./apply-changes.js');
const filepath = `${CONFIG.exportpath}effectmap.json`;

const names = process.argv.slice(2) || ['unnamed'];

applyChanges(filepath, names);
