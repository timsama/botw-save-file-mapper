const CONFIG = require('../config.js');
const applyChanges = require('../lib/apply-changes.js')();
const filepath = `${CONFIG.mapfilepath}effectmap.json`;

const hearts = parseFloat(process.argv[2]);
if (!isNaN(hearts)) {
    const quarterHearts = Math.floor(hearts * 4);
    const names = [`stats.heartcontainers=${quarterHearts}`, `stats.heartsfilled=${quarterHearts}`];

    applyChanges(filepath, names);
} else {
    console.log(`Could not parse '${process.argv[2]}' as a number.`);
}
