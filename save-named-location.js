const saveNamedChange = require('./save-named-change.js');

const name = process.argv[2] || readline.question('Name of location: ');
const args = process.argv.slice(3);
const excludeOrientation = args.indexOf('exclude-orientation') !== -1;

if (!!name) {
    const offsets = [
        0x000C3BF0,
        0x000C3BF8,
        0x000C3C00
    ];

    if (!excludeOrientation) {
        offsets.push(0x0006ea68);
    }

    saveNamedChange('locations.' + name, offsets);
    console.log(`Location ${name} saved!`);
} else {
    console.log('Unnamed locations not allowed.');
}
