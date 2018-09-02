const CONFIG = require('./config.js');
const readChanges = require('./read-changes.js')();
const filepath = `${CONFIG.exportpath}effectmap.json`;

const isLogNamesCommand = entry => entry == 'log-names';

const names = process.argv.slice(2).filter(entry => !isLogNamesCommand(entry)) || ['unnamed'];

const logChangeNames = process.argv.slice(3).some(isLogNamesCommand);

readChanges(filepath, names, logChangeNames);
