var query = require('cli-interact').getYesNo;
var saveFileUtils = require('./save-file-utils.js');

const BuildRecursiveSearcher = (saveFilepath, binarySync) => {
    return {
        search: (allChangesToApply, allChangesToUnapply, getChanges) => {
            const writeToOffset = saveFileUtils.buildWriter('uint32', binarySync);
            const toHexString = saveFileUtils.toHexString;

            const recursiveSearch = (changesToApply, changesToUnapply) => {
                if (changesToApply.length === 1) {
                    if (tryCombination(getChanges(changesToApply), changesToUnapply)) {
                        return getChanges(changesToApply);
                    } else {
                        return [];
                    }
                }

                const half = Math.ceil(changesToApply.length / 2.0);
                const firstHalf = changesToApply.slice(0, half);
                const secondHalf = changesToApply.slice(half);

                if (tryCombination(getChanges(firstHalf), changesToUnapply)) {
                    return recursiveSearch(firstHalf, changesToUnapply);
                } else {
                    return recursiveSearch(secondHalf, changesToUnapply);
                }
            };

            var index = 0;

            const tryCombination = (changesToApply, changesToUnapply) => {
                console.log('Trying the following entries:');
                changesToApply.forEach((entry) => {
                    console.log(`0x${toHexString(entry.offset)}: ${toHexString(entry.value)}`);
                });

                // apply changes to test
                changesToApply.forEach((entry) => {
                   writeToOffset(entry.offset, entry.value);
                });

                binarySync.saveAsSync(saveFilepath);

                const worked = query(`Save file generated. (${++index} of ${Math.ceil(Math.log(allChangesToApply.length, 2)) + 2}) Did it work?`);

                // revert changes for next test
                changesToUnapply.forEach((entry) => {
                   writeToOffset(entry.offset, entry.value);
                });

                binarySync.saveAsSync(saveFilepath);

                return worked;
            };

            return recursiveSearch(allChangesToApply, allChangesToUnapply);
        }
    };
};

module.exports = BuildRecursiveSearcher;
