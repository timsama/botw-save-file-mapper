const unapplyChanges = require('./unapply-raw-changes.js');

const names = process.argv.slice(2) || ['unnamed'];

unapplyChanges(names);
