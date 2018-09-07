const CONFIG = require('../config.json');
const applyChanges = require('../lib/apply-changes.js')();
const filepath = `${CONFIG.mapfilepath}effectmap.json`;

const isSkipSoftDependencies = entry => entry == 'skip-soft-dependencies';
const isWithLogging = entry => entry == 'with-logging';

const names = process.argv.slice(2).filter(entry => !isSkipSoftDependencies(entry) && !isWithLogging(entry)) || ['unnamed'];

const skipSoftDependencies = process.argv.slice(3).some(isSkipSoftDependencies);
const withLogging = process.argv.slice(3).some(isWithLogging);

applyChanges(filepath, names, { skipSoftDependencies: skipSoftDependencies, withLogging: withLogging });
