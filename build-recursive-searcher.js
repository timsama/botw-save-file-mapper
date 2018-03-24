const saveFileUtils = require('./save-file-utils.js');

const BuildRecursiveSearcher = (saveFilepath, binarySync, skipLogging) => {
    return {
        search: (allChangesToApply, allChangesToUnapply, successQueryFunc, getChangesOverride) => {
            const writeToOffset = saveFileUtils.buildWriter('uint32', binarySync);
            const toHexString = saveFileUtils.toHexString;
            const getChanges = !!getChangesOverride ? getChangesOverride : (a) => { return a };

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
                !skipLogging && console.log('Trying the following entries:');
                !skipLogging && changesToApply.forEach((entry) => {
                    console.log(`0x${toHexString(entry.offset)}: ${toHexString(entry.value)}`);
                });

                // apply changes to test
                changesToApply.forEach((entry) => {
                   writeToOffset(entry.offset, entry.value);
                });

                binarySync.saveAsSync(saveFilepath);

                const worked = successQueryFunc(++index, allChangesToApply.length);

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
