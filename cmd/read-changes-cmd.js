const CONFIG = require('../config.js');
const readChanges = require('../lib/read-changes.js')();
const filepath = `${CONFIG.mapfilepath}effectmap.json`;

const isLogNamesCommand = entry => entry == 'log-names';

const names = process.argv.slice(2).filter(entry => !isLogNamesCommand(entry)) || ['unnamed'];

const logChangeNames = process.argv.slice(3).some(isLogNamesCommand);

console.log(readChanges(filepath, names, logChangeNames));
