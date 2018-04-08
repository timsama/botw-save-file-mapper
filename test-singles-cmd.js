const testSingles = require('./test-singles.js');
const readline = require('readline-sync');

const name = process.argv[2] || 'unnamed';

const args = process.argv.slice(3);

const renameArgs = args.filter((arg) => arg.indexOf('rename') !== -1);
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

const onlyTestOnes = args.indexOf('only-ones') !== -1 || args.indexOf('only-test-ones') !== -1 ;
const knownValueArgs = args.filter((arg) => arg.indexOf('known-value=') !== -1);
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