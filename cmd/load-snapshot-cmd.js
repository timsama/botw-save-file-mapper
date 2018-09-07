const loadSnapshot = require('../lib/load-snapshot.js');

const name = process.argv[2] || readline.question('What snapshot would you like to load?');

loadSnapshot(name);
