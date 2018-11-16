const CONFIG = require('../config.json');
const applyChanges = require('../lib/apply-changes.js')();
const filepath = `${CONFIG.mapfilepath}effectmap.json`;

const rupees = parseFloat(process.argv[2]);
if (!isNaN(rupees)) {
    const names = [`stats.rupees=${rupees}`];

    applyChanges(filepath, names);
} else {
    console.log(`Could not parse '${process.argv[2]}' as a number.`);
}
