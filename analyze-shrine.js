const CONFIG = require('./config.js');
const applyChanges = require('./apply-changes.js')();
const buildRawChanges = require('./build-raw-changes.js')
const fs = require('fs');;
const loadSnapshot = require('./load-snapshot.js');
const testSingles = require('./test-singles.js');

const locationFilepath = `${CONFIG.exportpath}locations.json`;
const captionImagepath = `${CONFIG.savepath}caption.jpg`;
const tempCaptionImagepath = `${CONFIG.tempoutputpath}caption.temp.jpg`;

const name = process.argv[2];
const foundFlagName = `shrines.${name}.found`;
const activeFlagName = `shrines.${name}.active`;
const completeFlagName = `shrines.${name}.complete`;

if (!!name) {
    const snapShotLoaded = loadSnapshot('ShrineAnalyzer');
    if (snapShotLoaded) {
        fs.renameSync(captionImagepath, tempCaptionImagepath);
        fs.copyFileSync(CONFIG.placeholderImagepath, captionImagepath);

        console.log(`Analyzing 'found' flag: load and then save immediately.`);
        applyChanges(locationFilepath, [`${name}shrine`]);
        buildRawChanges(foundFlagName, true, undefined, 'Load, save immediately, then press [Enter].', true);
        buildRawChanges(activeFlagName, true, undefined, 'Activate the shrine, save, then press [Enter].', true);
        buildRawChanges(completeFlagName, true, undefined, 'Complete the shrine, save, then press [Enter].', true);

        fs.unlinkSync(captionImagepath);
        fs.renameSync(tempCaptionImagepath, captionImagepath);

        loadSnapshot('ShrineAnalyzer');

        console.log('\n=== Now Searching for Offsets ===')
        
        console.log(`\nSearching for ${foundFlagName}`);
        testSingles(foundFlagName, undefined, 1, undefined, true, true, true);
        applyChanges(undefined, [foundFlagName]);
        
        console.log(`\nSearching for ${activeFlagName}`);
        testSingles(activeFlagName, undefined, 1, undefined, true, true, true);
        applyChanges(undefined, [foundFlagName, activeFlagName]);
        
        console.log(`\nSearching for ${completeFlagName}`);
        testSingles(completeFlagName, undefined, 1, undefined, true, true, true);
        console.log('\n=== Complete! ===')
    } else {
        console.log('No shrine analyzer snapshot found! Create your ideal shrine defeating build, and take a snapshot of it called \'ShrineAnalyzer\' and then try again.');
    }
} else {
    console.log('Cannot analyzed unnamed shrines');
}
