const CONFIG = require('./config.js');
const applyChanges = require('./apply-changes.js')();
const filepath = `${CONFIG.exportpath}effectmap.json`;

const isSkipSoftDependencies = entry => entry == 'skip-soft-dependencies';

const names = process.argv.slice(2).filter(entry => !isSkipSoftDependencies(entry)) || ['unnamed'];

const skipSoftDependencies = process.argv.slice(3).some(isSkipSoftDependencies);

applyChanges(filepath, names, skipSoftDependencies);
