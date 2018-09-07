const buildRawChanges = require('../lib/build-raw-changes.js');
const nameGetter = require('../lib/name-getter.js');

const name = nameGetter.getOptional(process.argv[2], 'Name of change set: ', 'Unnamed changes will likely be later overwritten. Are you sure?');

buildRawChanges(name);