const unapplyChanges = require('./unapply-changes.js');

const names = process.argv.slice(2) || ['unnamed'];

unapplyChanges(names);
