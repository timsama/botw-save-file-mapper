const CONFIG = require('./config.js');
const applyChanges = require('./apply-changes.js')();
const filepath = `${CONFIG.exportpath}locations.json`;

const location = process.argv[2];

applyChanges(filepath, [location]);
