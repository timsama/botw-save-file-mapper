const CONFIG = require('../config.js');
const applyChanges = require('../lib/apply-changes.js')();
const filepath = `${CONFIG.mapfilepath}locations.json`;

const location = process.argv[2];

applyChanges(filepath, [location]);
