const CONFIG = require('../config.json');
const readChanges = require('../lib/read-changes.js')();
const filepath = `${CONFIG.mapfilepath}effectmap.json`;

const isWithLogging = entry => entry == 'with-logging';

const names = process.argv.slice(2).filter(entry => !isWithLogging(entry)) || ['unnamed'];

const withLogging = process.argv.slice(3).some(isWithLogging);

console.log(readChanges(filepath, names, withLogging));
