module.exports = (name, newName, knownValue, knownPreviousValue, filterKnownOffsets, nonVariable, saveQuery, knownDependencies, queryFuncOverride, skipLogging, pathOverride, appendToExisting) => {
    const saveFileUtils = require('./save-file-utils.js');
    const buildRecursiveSearcher = require('./build-recursive-searcher.js');
    const resultExporter = require('./json-result-exporter.js');
    const fs = require('fs');
    const CONFIG = require('./config.js');
    const folderUtils = require('./folder-utils.js');
    const mapFileUtils = require('./map-file-utils.js');
    const query = require('cli-interact').getYesNo;

    const changesFilename = name + '.raw.changes';
    const changesFilepath = pathOverride || (CONFIG.rawchangespath + changesFilename);
    const saveFilepath = `${CONFIG.savepath}game_data.sav`;
    const captionImagepath = `${CONFIG.savepath}caption.jpg`;
    const tempCaptionImagepath = `${CONFIG.tempoutputpath}caption.temp.jpg`;

    const args = process.argv.slice(3);

    folderUtils.buildFoldersIfTheyDoNotExist(tempCaptionImagepath);

    const offsetFilter = (() => {
        if (filterKnownOffsets) {
            return mapFileUtils.getKnownOffsetsFilter();
        } else {
            return () => true;
        }
    })();

    const unfilteredUnapplyChanges = saveFileUtils.getChangesToUnapply(changesFilepath);
    const unfilteredApplyChanges = saveFileUtils.getChangesToApply(changesFilepath);
    const allChangesToApply = unfilteredApplyChanges.filter((address, i) => {
        return (knownValue === undefined || address.value === knownValue) && (knownPreviousValue === undefined || unfilteredUnapplyChanges[i].value === knownPreviousValue);
    }).filter(offsetFilter);
    const allChangesToUnapply = unfilteredUnapplyChanges.filter((address, i) => {
        return (knownValue === undefined || unfilteredApplyChanges[i] && unfilteredApplyChanges[i].value === knownValue) && (knownPreviousValue === undefined || address.value === knownPreviousValue);
    }).filter(offsetFilter);

    if (allChangesToApply.length > 0 && allChangesToUnapply.length > 0) {
        fs.renameSync(captionImagepath, tempCaptionImagepath);
        fs.copyFileSync(CONFIG.placeholderImagepath, captionImagepath);

        const results = saveFileUtils.withBinaryFileSync(saveFilepath, (binary) => {
            const recursiveSearcher = buildRecursiveSearcher(saveFilepath, binary, skipLogging);

            const queryFunc = !!queryFuncOverride ? queryFuncOverride : (index, allChangesLength) => {
                return query(`Save file generated. (${index} of ${Math.ceil(Math.log(allChangesLength, 2)) + 2}) Did it work?`);
            };
            const results = recursiveSearcher.search(allChangesToApply, allChangesToUnapply, queryFunc, (a) => a);

            const mightSaveAsVariableReasons = [];
            if (!nonVariable && (knownValue !== undefined && knownValue !== 1 || knownPreviousValue !== undefined)) {
                mightSaveAsVariableReasons.push('You searched for a known value.');
            }

            // handling booleans for test-ones
            const finalName = newName || name;
            const [lastPartOfName] = finalName.split('.').reverse();
            if (lastPartOfName === 'set' && knownValue === 1) {
                const setResults = results.map(result => {
                    return {
                        offset: result.offset,
                        value: true
                    };
                });
                const unsetResults = results.map(result => {
                    return {
                        offset: result.offset,
                        value: false
                    };
                });
                const unsetName = finalName.split('.').slice(0, -1).concat('unset').join('.');
                
                const shouldSaveResult = results.length > 0 &&  query('Would you like to export this result?');
                const saveQueryOverride = () => shouldSaveResult;

                resultExporter(setResults, finalName, [], false, undefined, saveQueryOverride, knownDependencies, true, appendToExisting);
                resultExporter(unsetResults, unsetName, [], false, undefined, saveQueryOverride, knownDependencies, true, appendToExisting);
            } else {
                resultExporter(results, newName || name, mightSaveAsVariableReasons, false, undefined, saveQuery, knownDependencies, skipLogging, appendToExisting);
            }

            return results;
        });

        fs.unlinkSync(captionImagepath);
        fs.renameSync(tempCaptionImagepath, captionImagepath);

        return results;
    } else {
        !skipLogging && console.log('No testable changes available with your current filter settings.');
        return undefined;
    }
};