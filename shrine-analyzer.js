const CONFIG = require('./config.js');
const applyChanges = require('./apply-changes.js')();
const buildRawChanges = require('./build-raw-changes.js')
const fs = require('fs');;
const loadSnapshot = require('./load-snapshot.js');
const testSingles = require('./test-singles.js');
const readline = require('readline-sync');
const resultExporter = require('./json-result-exporter.js');

const locationFilepath = `${CONFIG.exportpath}locations.json`;
const captionImagepath = `${CONFIG.savepath}caption.jpg`;
const tempCaptionImagepath = `${CONFIG.tempoutputpath}caption.temp.jpg`;

const name = process.argv[2];
const hasQuest = process.argv.slice(3).some(entry => entry == 'with-quest' || entry.split('=')[0] == 'quest');
const skipData = process.argv.slice(3).some(entry => entry == 'skip-data');
const skipSnapshot = process.argv.slice(3).some(entry => entry == 'skip-snap' || entry == 'skip-snapshot');
const includeKnown = process.argv.slice(3).some(entry => entry == 'include-known');
const foundFlagName = `shrines.${name}.found`;
const activeFlagName = `shrines.${name}.active`;
const pedestalFlagName = `shrines.${name}.pedestal`;
const completeFlagName = `shrines.${name}.complete`;
const questNameRaw = process.argv.slice(3).find(entry => entry.split('=')[0] == 'quest');
const questName = (() => {
    if (!!questNameRaw) {
        return questNameRaw.split('=')[1].toLowerCase();
    } else if (hasQuest) {
        const response = readline.question('What is the name of the quest? ');
        return response.split(' ').join('').split('\'').join('').toLowerCase();
    } else {
        return undefined;
    }
})();
const questCompleteFlagName = `shrinequests.${questName}.complete`;

if (!!name) {
    const snapShotLoaded = skipSnapshot || loadSnapshot('GameAnalyzer');
    if (snapShotLoaded) {
        if (!skipData) {
            fs.renameSync(captionImagepath, tempCaptionImagepath);
            fs.copyFileSync(CONFIG.placeholderImagepath, captionImagepath);

            console.log('\n=== Gathering Data ===\n');
            applyChanges(locationFilepath, [`shrines.${name}`]);

            if (hasQuest) {
                applyChanges(undefined, [questCompleteFlagName]);
            }

            buildRawChanges(foundFlagName, true, undefined, 'Load, save immediately, then press [Enter].', true);
            buildRawChanges(activeFlagName, true, undefined, 'Activate the shrine, save, then press [Enter].', true);
            buildRawChanges(completeFlagName, true, undefined, 'Complete the shrine, save, then press [Enter].', true);

            fs.unlinkSync(captionImagepath);
            fs.renameSync(tempCaptionImagepath, captionImagepath);

            loadSnapshot('GameAnalyzer');
        }

        console.log('\n=== Searching for Offsets ===');
        
        applyChanges(locationFilepath, [`shrines.${name}`]);
        if (hasQuest) {
            applyChanges(undefined, [questCompleteFlagName]);
        }

        console.log(`\nSearching for ${foundFlagName}`);
        const foundDeps = {};
        if (hasQuest) {
            foundDeps.harddependencies = [questCompleteFlagName];
        }
        testSingles(foundFlagName, undefined, 1, undefined, !includeKnown, true, () => true, foundDeps);
        applyChanges(undefined, [foundFlagName]);
        
        console.log(`\nSearching for ${pedestalFlagName}`);
        const pedestalDeps = {
            harddependencies: [foundFlagName]
        };
        testSingles(activeFlagName, pedestalFlagName, 1, undefined, !includeKnown, true, () => true, pedestalDeps);
        applyChanges(undefined, [pedestalFlagName]);
        
        console.log(`\nSearching for ${activeFlagName}`);
        const activeDeps = {
            harddependencies: [foundFlagName],
            softdependencies: [pedestalFlagName]
        };
        testSingles(activeFlagName, undefined, 1, undefined, !includeKnown, true, () => true, activeDeps);
        applyChanges(undefined, [activeFlagName]);
        
        console.log(`\nSearching for ${completeFlagName}`);
        const completeDeps = {
            harddependencies: [foundFlagName],
            softdependencies: [activeFlagName]
        };
        testSingles(completeFlagName, undefined, 1, undefined, !includeKnown, true, () => true, completeDeps);
        console.log('\n=== Complete! ===')
    } else {
        console.log('No shrine analyzer snapshot found! Create your ideal shrine completing build, and take a snapshot of it called \'GameAnalyzer\' and then try again.');
    }
} else {
    console.log('Cannot analyzed unnamed shrines');
}
