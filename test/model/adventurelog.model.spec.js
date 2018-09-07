module.exports = () => {
    const assert = require('assert');
    const AdventureLog = require('../../model/adventurelog.model.js');
    const md5 = require('md5-file').sync;
    const fs = require('fs');
    const ModelTestUtils = require('./model-test-utils.js');
    const subModelTest = require('./model-test-template.js');

    const baseFilePath = './test/blank.sav';
    const testFilePath = './test/adventurelog.test.sav';

    const expectedFile = './test/adventurelog.model.spec.sav';

    const expectedJson = {
        "mainquests": {
            "capturedmemories": {
                "begun": false,
                "complete": false,
                "completedsteps": [
                    "mainquests.capturedmemories.championstunictaken.set",
                    "mainquests.capturedmemories.memory1.set"
                ],
                "incompletesteps": [
                    "mainquests.capturedmemories.begun.set",
                    "mainquests.capturedmemories.memory2.set",
                    "mainquests.capturedmemories.memory3.set",
                    "mainquests.capturedmemories.memory4.set",
                    "mainquests.capturedmemories.memory5.set",
                    "mainquests.capturedmemories.memory6.set",
                    "mainquests.capturedmemories.memory7.set",
                    "mainquests.capturedmemories.memory8.set",
                    "mainquests.capturedmemories.memory9.set",
                    "mainquests.capturedmemories.memory10.set",
                    "mainquests.capturedmemories.memory11.set",
                    "mainquests.capturedmemories.memory12.set",
                    "mainquests.capturedmemories.12memoriescomplete.set",
                    "mainquests.capturedmemories.finalmemory.set",
                    "mainquests.capturedmemories.complete.set"
                ]
            },
            "championdarukssong": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.championdarukssong.begun.set",
                    "mainquests.championdarukssong.trial1complete.set",
                    "mainquests.championdarukssong.trial2complete.set",
                    "mainquests.championdarukssong.trial3complete.set",
                    "mainquests.championdarukssong.illusoryrealmbattleunlocked.set",
                    "mainquests.championdarukssong.complete.set"
                ],
                "incompletesteps": []
            },
            "championmiphassong": {
                "begun": true,
                "complete": false,
                "completedsteps": [
                    "mainquests.championmiphassong.begun.set"
                ],
                "incompletesteps": [
                    "mainquests.championmiphassong.trial1complete.set",
                    "mainquests.championmiphassong.trial2complete.set",
                    "mainquests.championmiphassong.trial3complete.set",
                    "mainquests.championmiphassong.illusoryrealmbattleunlocked.set",
                    "mainquests.championmiphassong.complete.set"
                ]
            },
            "championrevalissong": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.championrevalissong.begun.set",
                    "mainquests.championrevalissong.trial1complete.set",
                    "mainquests.championrevalissong.trial2complete.set",
                    "mainquests.championrevalissong.trial3complete.set",
                    "mainquests.championrevalissong.illusoryrealmbattleunlocked.set",
                    "mainquests.championrevalissong.complete.set"
                ],
                "incompletesteps": []
            },
            "championurbosassong": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.championurbosassong.begun.set",
                    "mainquests.championurbosassong.trial1complete.set",
                    "mainquests.championurbosassong.trial2complete.set",
                    "mainquests.championurbosassong.trial3complete.set",
                    "mainquests.championurbosassong.illusoryrealmbattleunlocked.set",
                    "mainquests.championurbosassong.complete.set"
                ],
                "incompletesteps": []
            },
            "destroyganon": {
                "begun": true,
                "complete": false,
                "completedsteps": [
                    "mainquests.destroyganon.begun.set"
                ],
                "incompletesteps": [
                    "mainquests.destroyganon.complete.set"
                ]
            },
            "divinebeastvahmedoh": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.divinebeastvahmedoh.begun.set",
                    "mainquests.divinebeastvahmedoh.talktosaki.set",
                    "mainquests.divinebeastvahmedoh.theflightrange.set",
                    "mainquests.divinebeastvahmedoh.impressteba.set",
                    "mainquests.divinebeastvahmedoh.boardvahmedoh.set",
                    "mainquests.divinebeastvahmedoh.complete.set"
                ],
                "incompletesteps": []
            },
            "divinebeastvahnaboris": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.divinebeastvahnaboris.begun.set",
                    "mainquests.divinebeastvahnaboris.talktoteake.set",
                    "mainquests.divinebeastvahnaboris.entertheyigahideout.set",
                    "mainquests.divinebeastvahnaboris.defeatmasterkohga.set",
                    "mainquests.divinebeastvahnaboris.obtainthethunderhelm.set",
                    "mainquests.divinebeastvahnaboris.returnthethunderhelm.set",
                    "mainquests.divinebeastvahnaboris.meetrijuatlookout.set",
                    "mainquests.divinebeastvahnaboris.boardvahnaboris.set",
                    "mainquests.divinebeastvahnaboris.complete.set"
                ],
                "incompletesteps": []
            },
            "divinebeastvahrudania": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.divinebeastvahrudania.begun.set",
                    "mainquests.divinebeastvahrudania.rescueyunobo.set",
                    "mainquests.divinebeastvahrudania.talktobludo.set",
                    "mainquests.divinebeastvahrudania.bridgeofeldin.set",
                    "mainquests.divinebeastvahrudania.boardvahrudania.set",
                    "mainquests.divinebeastvahrudania.complete.set"
                ],
                "incompletesteps": []
            },
            "divinebeastvahruta": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.divinebeastvahruta.begun.set",
                    "mainquests.divinebeastvahruta.talktomuzu.set",
                    "mainquests.divinebeastvahruta.wearzoraarmor.set",
                    "mainquests.divinebeastvahruta.collectshockarrows.set",
                    "mainquests.divinebeastvahruta.boardvahruta.set",
                    "mainquests.divinebeastvahruta.complete.set"
                ],
                "incompletesteps": []
            },
            "findthefairyfountain": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    "mainquests.findthefairyfountain.begun.set",
                    "mainquests.findthefairyfountain.complete.set"
                ]
            },
            "followthesheikahslate": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.followthesheikahslate.begun.set",
                    "mainquests.followthesheikahslate.complete.set"
                ],
                "incompletesteps": [],
                "rewards": [
                    {
                        "category": "keyitems",
                        "name": "sheikahslate"
                    }
                ]
            },
            "forbiddencityentry": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.forbiddencityentry.begun.set",
                    "mainquests.forbiddencityentry.buygerudoclothes.set",
                    "mainquests.forbiddencityentry.complete.set"
                ],
                "incompletesteps": [],
                "rewards": [
                    {
                        "category": "armor",
                        "name": "gerudoveil"
                    },
                    {
                        "category": "armor",
                        "name": "gerudotop"
                    },
                    {
                        "category": "armor",
                        "name": "gerudosirwal"
                    }
                ]
            },
            "freethedivinebeasts": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.freethedivinebeasts.begun.set",
                    "mainquests.freethedivinebeasts.freevahmedoh.set",
                    "mainquests.freethedivinebeasts.freevahnaboris.set",
                    "mainquests.freethedivinebeasts.freevahrudania.set",
                    "mainquests.freethedivinebeasts.freevahruta.set",
                    "mainquests.freethedivinebeasts.complete.set"
                ],
                "incompletesteps": []
            },
            "lockedmementos": {
                "begun": true,
                "complete": false,
                "completedsteps": [
                    "mainquests.lockedmementos.begun.set"
                ],
                "incompletesteps": [
                    "mainquests.lockedmementos.lightthefurnace.set",
                    "mainquests.lockedmementos.talktopurah.set",
                    "mainquests.lockedmementos.takeasnapofpurah.set",
                    "mainquests.lockedmementos.returntoimpa.set",
                    "mainquests.lockedmementos.complete.set"
                ]
            },
            "reachzorasdomain": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.reachzorasdomain.begun.set",
                    "mainquests.reachzorasdomain.sidonrivercutscene1.set",
                    "mainquests.reachzorasdomain.sidonrivercutscene2.set",
                    "mainquests.reachzorasdomain.sidonrivercutscene3.set",
                    "mainquests.reachzorasdomain.sidonrivercutscene4.set",
                    "mainquests.reachzorasdomain.sidonrivercutscene5.set",
                    "mainquests.reachzorasdomain.complete.set"
                ],
                "incompletesteps": [],
                "rewards": [
                    {
                        "category": "armor",
                        "name": "zoraarmor"
                    }
                ],
            },
            "seekoutimpa": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.seekoutimpa.begun.set",
                    "mainquests.seekoutimpa.complete.set"
                ],
                "incompletesteps": []
            },
            "thechampionsballad": {
                "begun": true,
                "complete": false,
                "completedsteps": [
                    "mainquests.thechampionsballad.begun.set"
                ],
                "incompletesteps": [
                    "mainquests.thechampionsballad.completethechampionsongs.set",
                    "mainquests.thechampionsballad.returntotheshrineofresurrectionagain.set",
                    "mainquests.thechampionsballad.finaltrial.begun.set",
                    "mainquests.thechampionsballad.finaltrial.complete.set",
                    "mainquests.thechampionsballad.complete.set"
                ]
            },
            "theherossword": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    "mainquests.theherossword.begun.set",
                    "mainquests.theherossword.complete.set"
                ]
            },
            "theisolatedplateau": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.theisolatedplateau.begun.set",
                    "mainquests.theisolatedplateau.collectedonespiritorb.set",
                    "mainquests.theisolatedplateau.collectedfourspiritorbs.set",
                    "mainquests.theisolatedplateau.shrines.jabaij.set",
                    "mainquests.theisolatedplateau.shrines.kehnamut.set",
                    "mainquests.theisolatedplateau.shrines.omanau.set",
                    "mainquests.theisolatedplateau.shrines.owadaim.set",
                    "mainquests.theisolatedplateau.complete.set"
                ],
                "incompletesteps": [
                ],
                "rewards": [
                    {
                        "category": "keyitems",
                        "name": "paraglider"
                    }
                ]
            }
        },
        "shrinequests": {
            "abrothersroast": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.abrothersroast.begun.set",
                    "shrinequests.abrothersroast.headtogorkotunnel.set",
                    "shrinequests.abrothersroast.complete.set"
                ],
                "incompletesteps": []
            },
            "afragmentedmonument": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.afragmentedmonument.begun.set",
                    "shrinequests.afragmentedmonument.complete.set"
                ],
                "incompletesteps": []
            },
            "alandscapeofastable": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.alandscapeofastable.begun.set",
                    "shrinequests.alandscapeofastable.complete.set"
                ],
                "incompletesteps": []
            },
            "asongofstorms": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.asongofstorms.begun.set",
                    "shrinequests.asongofstorms.complete.set"
                ],
                "incompletesteps": []
            },
            "atestofwill": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.atestofwill.begun.set",
                    "shrinequests.atestofwill.complete.set"
                ],
                "incompletesteps": []
            },
            "cliffsideetchings": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.cliffsideetchings.begun.set",
                    "shrinequests.cliffsideetchings.complete.set"
                ],
                "incompletesteps": []
            },
            "guardianslideshow": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.guardianslideshow.begun.set",
                    "shrinequests.guardianslideshow.complete.set"
                ],
                "incompletesteps": []
            },
            "intothevortex": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.intothevortex.begun.set",
                    "shrinequests.intothevortex.complete.set"
                ],
                "incompletesteps": []
            },
            "masterofthewind": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.masterofthewind.begun.set",
                    "shrinequests.masterofthewind.complete.set"
                ],
                "incompletesteps": []
            },
            "recitalatwarblersnest": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.recitalatwarblersnest.begun.set",
                    "shrinequests.recitalatwarblersnest.gatherthesisters.set",
                    "shrinequests.recitalatwarblersnest.returntokheel.set",
                    "shrinequests.recitalatwarblersnest.complete.set"
                ],
                "incompletesteps": []
            },
            "secretofthecedars": {
                "begun": true,
                "complete": false,
                "completedsteps": [
                    "shrinequests.secretofthecedars.begun.set",
                    "shrinequests.secretofthecedars.bombthecaveentrance.set"
                ],
                "incompletesteps": [
                    "shrinequests.secretofthecedars.complete.set"
                ]
            },
            "secretofthesnowypeaks": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.secretofthesnowypeaks.begun.set",
                    "shrinequests.secretofthesnowypeaks.complete.set"
                ],
                "incompletesteps": []
            },
            "shroudedshrine": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.shroudedshrine.begun.set",
                    "shrinequests.shroudedshrine.complete.set"
                ],
                "incompletesteps": []
            },
            "signoftheshadow": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.signoftheshadow.begun.set",
                    "shrinequests.signoftheshadow.complete.set"
                ],
                "incompletesteps": []
            },
            "strandedoneventide": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.strandedoneventide.begun.set",
                    "shrinequests.strandedoneventide.complete.set"
                ],
                "incompletesteps": []
            },
            "theancientritosong": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.theancientritosong.begun.set",
                    "shrinequests.theancientritosong.complete.set"
                ],
                "incompletesteps": []
            },
            "thebirdinthemountains": {
                "begun": true,
                "complete": false,
                "completedsteps": [
                    "shrinequests.thebirdinthemountains.begun.set"
                ],
                "incompletesteps": [
                    "shrinequests.thebirdinthemountains.complete.set"
                ]
            },
            "theceremonialsong": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.theceremonialsong.begun.set",
                    "shrinequests.theceremonialsong.complete.set"
                ],
                "incompletesteps": []
            },
            "thecrownedbeast": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thecrownedbeast.begun.set",
                    "shrinequests.thecrownedbeast.complete.set"
                ],
                "incompletesteps": []
            },
            "thecursedstatue": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thecursedstatue.begun.set",
                    "shrinequests.thecursedstatue.complete.set"
                ],
                "incompletesteps": []
            },
            "thedesertlabyrinth": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thedesertlabyrinth.begun.set",
                    "shrinequests.thedesertlabyrinth.complete.set"
                ],
                "incompletesteps": []
            },
            "theeyeofthesandstorm": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.theeyeofthesandstorm.begun.set",
                    "shrinequests.theeyeofthesandstorm.complete.set"
                ],
                "incompletesteps": []
            },
            "thegutcheckchallenge": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thegutcheckchallenge.begun.set",
                    "shrinequests.thegutcheckchallenge.complete.set"
                ],
                "incompletesteps": []
            },
            "thelostpilgrimage": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thelostpilgrimage.begun.set",
                    "shrinequests.thelostpilgrimage.complete.set"
                ],
                "incompletesteps": []
            },
            "theperfectdrink": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.theperfectdrink.begun.set",
                    "shrinequests.theperfectdrink.talktofurosa.set",
                    "shrinequests.theperfectdrink.delivertheice.set",
                    "shrinequests.theperfectdrink.complete.set"
                ],
                "incompletesteps": []
            },
            "theserpentsjaws": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.theserpentsjaws.begun.set",
                    "shrinequests.theserpentsjaws.prayatspring.set",
                    "shrinequests.theserpentsjaws.complete.set"
                ],
                "incompletesteps": []
            },
            "thesevenheroines": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thesevenheroines.begun.set",
                    "shrinequests.thesevenheroines.complete.set"
                ],
                "incompletesteps": []
            },
            "thesilentswordswomen": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thesilentswordswomen.begun.set",
                    "shrinequests.thesilentswordswomen.complete.set"
                ],
                "incompletesteps": []
            },
            "theskullseye": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.theskullseye.begun.set",
                    "shrinequests.theskullseye.complete.set"
                ],
                "incompletesteps": []
            },
            "thespringofpower": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thespringofpower.begun.set",
                    "shrinequests.thespringofpower.prayatspring.set",
                    "shrinequests.thespringofpower.complete.set"
                ],
                "incompletesteps": []
            },
            "thespringofwisdom": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thespringofwisdom.begun.set",
                    "shrinequests.thespringofwisdom.reachthespring.set",
                    "shrinequests.thespringofwisdom.freenaydra.set",
                    "shrinequests.thespringofwisdom.complete.set"
                ],
                "incompletesteps": []
            },
            "thestolenheirloom": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thestolenheirloom.begun.set",
                    "shrinequests.thestolenheirloom.complete.set"
                ],
                "incompletesteps": []
            },
            "thetestofwood": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thetestofwood.begun.set",
                    "shrinequests.thetestofwood.complete.set"
                ],
                "incompletesteps": []
            },
            "thethreegiantbrothers": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thethreegiantbrothers.begun.set",
                    "shrinequests.thethreegiantbrothers.complete.set"
                ],
                "incompletesteps": []
            },
            "thetworings": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.thetworings.begun.set",
                    "shrinequests.thetworings.complete.set"
                ],
                "incompletesteps": []
            },
            "theundefeatedchamp": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.theundefeatedchamp.begun.set",
                    "shrinequests.theundefeatedchamp.breaktalisrecord.set",
                    "shrinequests.theundefeatedchamp.complete.set"
                ],
                "incompletesteps": []
            },
            "trialofsecondsight": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.trialofsecondsight.begun.set",
                    "shrinequests.trialofsecondsight.complete.set"
                ],
                "incompletesteps": []
            },
            "trialofthelabyrinth": {
                "begun": true,
                "complete": false,
                "completedsteps": [
                    "shrinequests.trialofthelabyrinth.begun.set"
                ],
                "incompletesteps": [
                    "shrinequests.trialofthelabyrinth.complete.set"
                ]
            },
            "trialofthunder": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.trialofthunder.begun.set",
                    "shrinequests.trialofthunder.complete.set"
                ],
                "incompletesteps": []
            },
            "trialonthecliff": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.trialonthecliff.begun.set",
                    "shrinequests.trialonthecliff.complete.set"
                ],
                "incompletesteps": []
            },
            "underaredmoon": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.underaredmoon.begun.set",
                    "shrinequests.underaredmoon.complete.set"
                ],
                "incompletesteps": []
            },
            "watchoutfortheflowers": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "shrinequests.watchoutfortheflowers.begun.set",
                    "shrinequests.watchoutfortheflowers.complete.set"
                ],
                "incompletesteps": []
            }
        },
        "sidequests": {
            "agiftfromthemonks": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.agiftfromthemonks.begun.set',
                    'sidequests.agiftfromthemonks.tookcap.set',
                    'sidequests.agiftfromthemonks.tooktunic.set',
                    'sidequests.agiftfromthemonks.tooktrousers.set',
                    'sidequests.agiftfromthemonks.complete.set'
                ],
                "rewards": [
                    {
                        "category": "armor",
                        "name": "capofthewild"
                    },
                    {
                        "category": "armor",
                        "name": "tunicofthewild"
                    },
                    {
                        "category": "armor",
                        "name": "trousersofthewild"
                    }
                ]
            },
            "byfireflyslight": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.byfireflyslight.begun.set',
                    'sidequests.byfireflyslight.complete.set'
                ]
            },
            "findkheel": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.findkheel.begun.set',
                    'sidequests.findkheel.talktokheel.set',
                    'sidequests.findkheel.complete.set'
                ]
            },
            "flownthecoop": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.flownthecoop.begun.set',
                    'sidequests.flownthecoop.returnthecuccos.set',
                    'sidequests.flownthecoop.complete.set'
                ]
            },
            "robbiesresearch": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.robbiesresearch.begun.set',
                    'sidequests.robbiesresearch.introducedtojerrin.set',
                    'sidequests.robbiesresearch.blueflamefurnace.set',
                    'sidequests.robbiesresearch.complete.set'
                ]
            },
            "slatedforupgrades": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.slatedforupgrades.begun.set',
                    'sidequests.slatedforupgrades.complete.set'
                ]
            },
            "thepricelessmaracas": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.thepricelessmaracas.begun.set',
                    'sidequests.thepricelessmaracas.complete.set'
                ]
            },
            "trialofthesword": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.trialofthesword.begun.set',
                    'sidequests.trialofthesword.talktodekutree.set',
                    'sidequests.trialofthesword.beginningtrials.complete.set',
                    'sidequests.trialofthesword.middletrials.complete.set',
                    'sidequests.trialofthesword.complete.set'
                ]
            }
        },
        "memories": {
            "apremonition": {
                "remembered": true
            },
            "bladesoftheyiga": {
                "remembered": true
            },
            "championdarukssong": {
                "remembered": true
            },
            "championmiphassong": {
                "remembered": true
            },
            "championrevalissong": {
                "remembered": true
            },
            "championurbosassong": {
                "remembered": true
            },
            "daruksmettle": {
                "remembered": true
            },
            "despair": {
                "remembered": true
            },
            "fatheranddaughter": {
                "remembered": true
            },
            "miphastouch": {
                "remembered": true
            },
            "resolveandgrief": {
                "remembered": true
            },
            "returnofcalamityganon": {
                "remembered": true
            },
            "revalisflap": {
                "remembered": true
            },
            "shelterfromthestorm": {
                "remembered": true
            },
            "silentprincess": {
                "remembered": true
            },
            "slumberingpower": {
                "remembered": true
            },
            "subduedceremony": {
                "remembered": true
            },
            "thechampionsballad": {
                "remembered": true
            },
            "themastersword": {
                "remembered": true
            },
            "tomountlanayru": {
                "remembered": true
            },
            "urbosashand": {
                "remembered": true
            },
            "zeldasawakening": {
                "remembered": true
            },
            "zeldasresentment": {
                "remembered": true
            }
        }
    };

    return new Promise((resolve, reject) => {
        describe('adventurelog.model.js', function() {
            after(function() {
                if (fs.existsSync(testFilePath)) {
                    fs.unlinkSync(testFilePath);
                }
                resolve();
            });

            it('should write and read the adventurelog to/from the save file correctly', function() {
                fs.copyFileSync(baseFilePath, testFilePath);

                return AdventureLog.write(expectedJson, testFilePath).then(() => {
                    const actualJson = AdventureLog.read(testFilePath);

                    ModelTestUtils.doKeysMatch(expectedJson, actualJson, 'adventurelog');
                });
            }).timeout(10000);

            subModelTest('mainquests', expectedJson.mainquests)
                .then(subModelTest('memories', expectedJson.memories))
                .then(subModelTest('shrinequests', expectedJson.shrinequests))
                .then(subModelTest('sidequests', expectedJson.sidequests))
                .then(resolve);
        });
    });    
};
