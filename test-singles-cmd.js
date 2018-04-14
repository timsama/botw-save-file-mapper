const testSingles = require('./test-singles.js');
const readline = require('readline-sync');

const possibleFlags = [
    'only-ones',
    'only-test-ones',
    'known-value',
    'known-previous-value',
    'rename',
    'include-known',
    'include-known-offsets',
    'append',
    'append-to-existing'
];

const flagFilter = (str) => {
    const [prefix] = str.split('=');
    return possibleFlags.some(f => f == prefix);
};

const nameFilter = (str) => {
    return !flagFilter(str);
};

const name = process.argv.slice(2).find(nameFilter) || 'unnamed';

const args = process.argv.slice(2).filter(flagFilter);

const renameArgs = args.filter((arg) => arg.split('=')[0] == 'rename');
const shouldRename = renameArgs.length > 0;
const newName = (() => {
    if (shouldRename) {
        const argInput = renameArgs[0].split('=')[1];
        if (argInput) {
            return argInput;
        } else {
            return readline.question('What should the new name be? ');
        }
    }
})();

const onlyTestOnes = args.some(arg => arg == 'only-ones' || arg == 'only-test-ones');
const knownValueArgs = args.filter(arg => arg.split('=')[0] == 'known-value');
const findKnownValue = knownValueArgs.length > 0;
const knownValue = (() =>{
    if (findKnownValue) {
        return parseInt(knownValueArgs[0].split('=').slice(-1)[0]);
    } else if (onlyTestOnes) {
        return 1;
    }
})();

const knownPreviousValueArgs = args.filter((arg) => arg.indexOf('known-previous-value=') !== -1);
const findKnownPreviousValue = knownPreviousValueArgs.length > 0;
const knownPreviousValue = (() =>{
    if (findKnownPreviousValue) {
        return parseInt(knownPreviousValueArgs[0].split('=').slice(-1)[0]);
    }
})();

const includeKnownOffsets = args.indexOf('include-known-offsets') !== -1 || args.indexOf('include-known') !== -1;

const appendToExisting = args.some(entry => entry == 'append' || entry == 'append-to-existing');

testSingles(name, newName, knownValue, knownPreviousValue, !includeKnownOffsets, onlyTestOnes, undefined, undefined, undefined, undefined, undefined, appendToExisting);