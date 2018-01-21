const applyChanges = require('./resave-changes-as-json.js');

const names = process.argv.slice(2) || ['unnamed'];

applyChanges(names);
