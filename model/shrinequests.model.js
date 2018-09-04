module.exports = (() => {
    const ShrineQuest = require('./quest.model.js')('shrinequests');
    const CONFIG = require('../config.js');
    const changeReader = require('../read-changes.js');
    const changeWriter = require('../batch-apply-changes.js');
    const defaultEffectMap = `${CONFIG.exportpath}effectmap.json`;
    const mapFileUtils = require('../map-file-utils.js');

    const getChangeReader = (saveFile, effectMapPath) => {
        return (keys, withLogging) => {
            return changeReader(saveFile)(effectMapPath || defaultEffectMap, keys, withLogging);
        };
    };
    const getChangeWriter = (saveFile, effectMapPath) => {
        return (keys, skipSoftDependencies, withLogging) => {
            return changeWriter(saveFile)(effectMapPath || defaultEffectMap, keys, skipSoftDependencies, withLogging);
        };
    };

    const getKeypathReader = (effectMapPath) => {
        const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(effectMapPath || defaultEffectMap);
        return (keypath) => {
            return mapFileUtils.getValueAtKeyPath(effectMap, keypath);
        };
    };

    return {
        read: (saveFile, effectMapPath) => {
            const keypathReader = getKeypathReader(effectMapPath);
            const changeReader = getChangeReader(saveFile, effectMapPath);

            return {
                abrothersroast: ShrineQuest.read('abrothersroast', saveFile, keypathReader, changeReader),
                afragmentedmonument: ShrineQuest.read('afragmentedmonument', saveFile, keypathReader, changeReader),
                alandscapeofastable: ShrineQuest.read('alandscapeofastable', saveFile, keypathReader, changeReader),
                asongofstorms: ShrineQuest.read('asongofstorms', saveFile, keypathReader, changeReader),
                atestofwill: ShrineQuest.read('atestofwill', saveFile, keypathReader, changeReader),
                cliffsideetchings: ShrineQuest.read('cliffsideetchings', saveFile, keypathReader, changeReader),
                guardianslideshow: ShrineQuest.read('guardianslideshow', saveFile, keypathReader, changeReader),
                intothevortex: ShrineQuest.read('intothevortex', saveFile, keypathReader, changeReader),
                masterofthewind: ShrineQuest.read('masterofthewind', saveFile, keypathReader, changeReader),
                recitalatwarblersnest: ShrineQuest.read('recitalatwarblersnest', saveFile, keypathReader, changeReader),
                secretofthecedars: ShrineQuest.read('secretofthecedars', saveFile, keypathReader, changeReader),
                secretofthesnowypeaks: ShrineQuest.read('secretofthesnowypeaks', saveFile, keypathReader, changeReader),
                shroudedshrine: ShrineQuest.read('shroudedshrine', saveFile, keypathReader, changeReader),
                signoftheshadow: ShrineQuest.read('signoftheshadow', saveFile, keypathReader, changeReader),
                strandedoneventide: ShrineQuest.read('strandedoneventide', saveFile, keypathReader, changeReader),
                theancientritosong: ShrineQuest.read('theancientritosong', saveFile, keypathReader, changeReader),
                thebirdinthemountains: ShrineQuest.read('thebirdinthemountains', saveFile, keypathReader, changeReader),
                theceremonialsong: ShrineQuest.read('theceremonialsong', saveFile, keypathReader, changeReader),
                thecrownedbeast: ShrineQuest.read('thecrownedbeast', saveFile, keypathReader, changeReader),
                thecursedstatue: ShrineQuest.read('thecursedstatue', saveFile, keypathReader, changeReader),
                thedesertlabyrinth: ShrineQuest.read('thedesertlabyrinth', saveFile, keypathReader, changeReader),
                theeyeofthesandstorm: ShrineQuest.read('theeyeofthesandstorm', saveFile, keypathReader, changeReader),
                thegutcheckchallenge: ShrineQuest.read('thegutcheckchallenge', saveFile, keypathReader, changeReader),
                thelostpilgrimage: ShrineQuest.read('thelostpilgrimage', saveFile, keypathReader, changeReader),
                theperfectdrink: ShrineQuest.read('theperfectdrink', saveFile, keypathReader, changeReader),
                theserpentsjaws: ShrineQuest.read('theserpentsjaws', saveFile, keypathReader, changeReader),
                thesevenheroines: ShrineQuest.read('thesevenheroines', saveFile, keypathReader, changeReader),
                thesilentswordswomen: ShrineQuest.read('thesilentswordswomen', saveFile, keypathReader, changeReader),
                theskullseye: ShrineQuest.read('theskullseye', saveFile, keypathReader, changeReader),
                thespringofpower: ShrineQuest.read('thespringofpower', saveFile, keypathReader, changeReader),
                thespringofwisdom: ShrineQuest.read('thespringofwisdom', saveFile, keypathReader, changeReader),
                thestolenheirloom: ShrineQuest.read('thestolenheirloom', saveFile, keypathReader, changeReader),
                thetestofwood: ShrineQuest.read('thetestofwood', saveFile, keypathReader, changeReader),
                thethreegiantbrothers: ShrineQuest.read('thethreegiantbrothers', saveFile, keypathReader, changeReader),
                thetworings: ShrineQuest.read('thetworings', saveFile, keypathReader, changeReader),
                theundefeatedchamp: ShrineQuest.read('theundefeatedchamp', saveFile, keypathReader, changeReader),
                trialofsecondsight: ShrineQuest.read('trialofsecondsight', saveFile, keypathReader, changeReader),
                trialofthelabyrinth: ShrineQuest.read('trialofthelabyrinth', saveFile, keypathReader, changeReader),
                trialofthunder: ShrineQuest.read('trialofthunder', saveFile, keypathReader, changeReader),
                trialonthecliff: ShrineQuest.read('trialonthecliff', saveFile, keypathReader, changeReader),
                underaredmoon: ShrineQuest.read('underaredmoon', saveFile, keypathReader, changeReader),
                watchoutfortheflowers: ShrineQuest.read('watchoutfortheflowers', saveFile, keypathReader, changeReader)
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const keypathReader = getKeypathReader(effectMapPath);
            const changeWriter = getChangeWriter(saveFile, effectMapPath);

            return ShrineQuest.write('abrothersroast', modelJson.abrothersroast, saveFile, keypathReader, changeWriter)
                .then(() => ShrineQuest.write('afragmentedmonument', modelJson.afragmentedmonument, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('alandscapeofastable', modelJson.alandscapeofastable, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('asongofstorms', modelJson.asongofstorms, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('atestofwill', modelJson.atestofwill, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('cliffsideetchings', modelJson.cliffsideetchings, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('guardianslideshow', modelJson.guardianslideshow, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('intothevortex', modelJson.intothevortex, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('masterofthewind', modelJson.masterofthewind, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('recitalatwarblersnest', modelJson.recitalatwarblersnest, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('secretofthecedars', modelJson.secretofthecedars, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('secretofthesnowypeaks', modelJson.secretofthesnowypeaks, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('shroudedshrine', modelJson.shroudedshrine, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('signoftheshadow', modelJson.signoftheshadow, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('strandedoneventide', modelJson.strandedoneventide, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('theancientritosong', modelJson.theancientritosong, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thebirdinthemountains', modelJson.thebirdinthemountains, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('theceremonialsong', modelJson.theceremonialsong, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thecrownedbeast', modelJson.thecrownedbeast, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thecursedstatue', modelJson.thecursedstatue, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thedesertlabyrinth', modelJson.thedesertlabyrinth, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('theeyeofthesandstorm', modelJson.theeyeofthesandstorm, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thegutcheckchallenge', modelJson.thegutcheckchallenge, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thelostpilgrimage', modelJson.thelostpilgrimage, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('theperfectdrink', modelJson.theperfectdrink, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('theserpentsjaws', modelJson.theserpentsjaws, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thesevenheroines', modelJson.thesevenheroines, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thesilentswordswomen', modelJson.thesilentswordswomen, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('theskullseye', modelJson.theskullseye, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thespringofpower', modelJson.thespringofpower, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thespringofwisdom', modelJson.thespringofwisdom, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thestolenheirloom', modelJson.thestolenheirloom, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thetestofwood', modelJson.thetestofwood, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thethreegiantbrothers', modelJson.thethreegiantbrothers, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('thetworings', modelJson.thetworings, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('theundefeatedchamp', modelJson.theundefeatedchamp, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('trialofsecondsight', modelJson.trialofsecondsight, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('trialofthelabyrinth', modelJson.trialofthelabyrinth, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('trialofthunder', modelJson.trialofthunder, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('trialonthecliff', modelJson.trialonthecliff, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('underaredmoon', modelJson.underaredmoon, saveFile, keypathReader, changeWriter))
                .then(() => ShrineQuest.write('watchoutfortheflowers', modelJson.watchoutfortheflowers, saveFile, keypathReader, changeWriter));
        }
    };
})();
