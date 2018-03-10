const buildRawChanges = require('./build-raw-changes.js');
const nameGetter = require('./name-getter.js');

const name = nameGetter.getOptional(process.argv[2], 'Name of change set: ', 'Unnamed changes will likely be later overwritten. Are you sure?');

buildRawChanges(name);