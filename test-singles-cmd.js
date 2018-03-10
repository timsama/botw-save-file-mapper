const testSingles = require('./test-singles.js');

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

const filterKnownOffsets = args.indexOf('filter-known-offsets') !== -1 || args.indexOf('filter-known') !== -1;

testSingles(name, newName, knownValue, knownPreviousValue, filterKnownOffsets, onlyTestOnes);