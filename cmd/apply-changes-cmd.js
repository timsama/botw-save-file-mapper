const CONFIG = require('../config.json');
const applyChanges = require('../lib/apply-changes.js')();
const filepath = `${CONFIG.mapfilepath}effectmap.json`;

const isSkipSoftDependencies = entry => entry == 'skip-soft-dependencies';
const isLogNamesCommand = entry => entry == 'log-names';

const names = process.argv.slice(2).filter(entry => !isSkipSoftDependencies(entry) && !isLogNamesCommand(entry)) || ['unnamed'];

const skipSoftDependencies = process.argv.slice(3).some(isSkipSoftDependencies);
const logChangeNames = process.argv.slice(3).some(isLogNamesCommand);

applyChanges(filepath, names, skipSoftDependencies, logChangeNames);
