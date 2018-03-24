const CONFIG = require('./config.js');
const applyChanges = require('./apply-changes.js')();
const buildRawChanges = require('./build-raw-changes.js')
const fs = require('fs');;
const loadSnapshot = require('./load-snapshot.js');
const testSingles = require('./test-singles.js');
const readline = require('readline-sync');

const locationFilepath = `${CONFIG.exportpath}locations.json`;
const captionImagepath = `${CONFIG.savepath}caption.jpg`;
const tempCaptionImagepath = `${CONFIG.tempoutputpath}caption.temp.jpg`;

const skipData = process.argv.slice(3).some(entry => entry == 'skip-data');
const includeKnown = process.argv.slice(3).some(entry => entry == 'include-known');
const questNameRaw = process.argv[2] || readline.question('What is the name of the quest? ');
const questName = questNameRaw.split(' ').join('').split('\'').join('').toLowerCase();
const shrineNameRaw = process.argv.slice(3).find(entry => entry.split('=')[0] == 'shrine');
const shrineName = !!shrineNameRaw ? shrineNameRaw.split('=')[1].toLowerCase() : undefined;
const isSideQuest = process.argv.slice(3).some(entry => entry == 'side-quest');

const questPrefix = (() => {
    if (!!shrineName) {
        return 'shrinequests';
    } else if (isSideQuest) {
        return 'sidequests';
    } else {
        return 'mainquests';
    }
})();
const questBegunFlagName = `${questPrefix}.${questName}.begun`;
const questCompleteFlagName = `${questPrefix}.${questName}.complete`;

if (!!questName) {
    const snapShotLoaded = loadSnapshot('GameAnalyzer');
    if (snapShotLoaded) {
        if (!skipData) {
            fs.renameSync(captionImagepath, tempCaptionImagepath);
            fs.copyFileSync(CONFIG.placeholderImagepath, captionImagepath);

            console.log('\n=== Gathering Data ===\n');
            if (!!shrineName) {
                applyChanges(locationFilepath, [`shrines.${shrineName}`]);
            }

            buildRawChanges(questBegunFlagName, true, undefined, 'Load, flag the quest, save, then press [Enter].', true);
            buildRawChanges(questCompleteFlagName, true, undefined, 'Complete the quest, save, then press [Enter].', true);

            fs.unlinkSync(captionImagepath);
            fs.renameSync(tempCaptionImagepath, captionImagepath);
        }

        loadSnapshot('GameAnalyzer');

        console.log('\n=== Searching for Offsets ===');
        
    
        console.log(`\nSearching for ${questBegunFlagName}`);
        testSingles(questBegunFlagName, undefined, 1, undefined, !includeKnown, true, () => true);
        applyChanges(undefined, [questBegunFlagName]);
        
        console.log(`\nSearching for ${questCompleteFlagName}`);
        const questCompleteDeps = {
            harddependencies: [questBegunFlagName]
        };
        testSingles(questCompleteFlagName, undefined, 1, undefined, !includeKnown, true, () => true, questCompleteDeps);
        console.log('\n=== Complete! ===')
    } else {
        console.log('No quest analyzer snapshot found! Create your ideal quest completing build, and take a snapshot of it called \'GameAnalyzer\' and then try again.');
    }
} else {
    console.log('Cannot analyzed unnamed quests');
}
