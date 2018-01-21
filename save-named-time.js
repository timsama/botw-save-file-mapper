const saveNamedChange = require('./save-named-change.js');

const name = process.argv[2] || readline.question('Name of time: ');

if (!!name) {
    const offsets = [
        0x000C14B0
    ];
    saveNamedChange('time.' + name, offsets);
    console.log(`Time ${name} saved!`);
} else {
    console.log('Unnamed times not allowed.');
}
