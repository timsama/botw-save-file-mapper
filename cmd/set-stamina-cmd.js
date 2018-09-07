const CONFIG = require('../config.json');
const applyChanges = require('../lib/apply-changes.js')();
const filepath = `${CONFIG.mapfilepath}effectmap.json`;
const readline = require('readline-sync');

const upgrades = [
    0x447a0000, // base
    0x44960000, // 1/5 first wheel
    0x44AF0000, // 2/5 first wheel
    0x44c80000, // 3/5 first wheel
    0x44e10000, // 4/5 first wheel
    0x44FA0000, // 5/5 first wheel
    0x45098000, // 1/5 second wheel
    0x45160000, // 2/5 second wheel
    0x45228000, // 3/5 second wheel
    0x452f0000, // 4/5 second wheel
    0x453b8000, // 5/5 second wheel
];

const rawContainers = process.argv[2] || readline.question('How many stamina gauge upgrades total? (0-10) ');
const containers = parseInt(rawContainers);
if (!isNaN(containers)) {
    const upgradeValue = (() => {
        if (!upgrades[containers]) {
            // this goes beyond what is normally allowed
            return upgrades[10] + (containers - 10) * 0xc8000;
        } else {
            return upgrades[containers];
        }
    })();

    const names = [`stats.staminagauge=${upgradeValue}`];

    applyChanges(filepath, names);
} else {
    console.log(`Could not parse '${process.argv[2]}' as a number.`);
}
