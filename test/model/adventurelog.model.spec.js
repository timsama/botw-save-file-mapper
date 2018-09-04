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
                    "mainquests.capturedmemories.memory1"
                ],
                "incompletesteps": [
                    "mainquests.capturedmemories.begun",
                    "mainquests.capturedmemories.memory2",
                    "mainquests.capturedmemories.memory3",
                    "mainquests.capturedmemories.memory4",
                    "mainquests.capturedmemories.memory5",
                    "mainquests.capturedmemories.memory6",
                    "mainquests.capturedmemories.memory7",
                    "mainquests.capturedmemories.memory8",
                    "mainquests.capturedmemories.memory9",
                    "mainquests.capturedmemories.memory10",
                    "mainquests.capturedmemories.memory11",
                    "mainquests.capturedmemories.memory12",
                    "mainquests.capturedmemories.12memoriescomplete",
                    "mainquests.capturedmemories.finalmemory",
                    "mainquests.capturedmemories.complete"
                ]
            },
            "championdarukssong": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.championdarukssong.begun",
                    "mainquests.championdarukssong.trial1complete",
                    "mainquests.championdarukssong.trial2complete",
                    "mainquests.championdarukssong.trial3complete",
                    "mainquests.championdarukssong.illusoryrealmbattleunlocked",
                    "mainquests.championdarukssong.complete"
                ],
                "incompletesteps": []
            },
            "championmiphassong": {
                "begun": true,
                "complete": false,
                "completedsteps": [
                    "mainquests.championmiphassong.begun"
                ],
                "incompletesteps": [
                    "mainquests.championmiphassong.trial1complete",
                    "mainquests.championmiphassong.trial2complete",
                    "mainquests.championmiphassong.trial3complete",
                    "mainquests.championmiphassong.illusoryrealmbattleunlocked",
                    "mainquests.championmiphassong.complete"
                ]
            },
            "championrevalissong": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.championrevalissong.begun",
                    "mainquests.championrevalissong.trial1complete",
                    "mainquests.championrevalissong.trial2complete",
                    "mainquests.championrevalissong.trial3complete",
                    "mainquests.championrevalissong.illusoryrealmbattleunlocked",
                    "mainquests.championrevalissong.complete"
                ],
                "incompletesteps": []
            },
            "championurbosassong": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.championurbosassong.begun",
                    "mainquests.championurbosassong.trial1complete",
                    "mainquests.championurbosassong.trial2complete",
                    "mainquests.championurbosassong.trial3complete",
                    "mainquests.championurbosassong.illusoryrealmbattleunlocked",
                    "mainquests.championurbosassong.complete"
                ],
                "incompletesteps": []
            },
            "destroyganon": {
                "begun": true,
                "complete": false,
                "completedsteps": [
                    "mainquests.destroyganon.begun"
                ],
                "incompletesteps": [
                    "mainquests.destroyganon.complete"
                ]
            },
            "divinebeastvahmedoh": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.divinebeastvahmedoh.begun",
                    "mainquests.divinebeastvahmedoh.talktosaki",
                    "mainquests.divinebeastvahmedoh.theflightrange",
                    "mainquests.divinebeastvahmedoh.impressteba",
                    "mainquests.divinebeastvahmedoh.boardvahmedoh",
                    "mainquests.divinebeastvahmedoh.complete"
                ],
                "incompletesteps": []
            },
            "divinebeastvahnaboris": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.divinebeastvahnaboris.begun",
                    "mainquests.divinebeastvahnaboris.talktoteake.subtasks.getpermissionfromteake",
                    "mainquests.divinebeastvahnaboris.talktoteake",
                    "mainquests.divinebeastvahnaboris.entertheyigahideout",
                    "mainquests.divinebeastvahnaboris.defeatmasterkohga",
                    "mainquests.divinebeastvahnaboris.obtainthethunderhelm",
                    "mainquests.divinebeastvahnaboris.thunderhelmtaken",
                    "mainquests.divinebeastvahnaboris.returnthethunderhelm.subtasks.rijuawaitsatlookout",
                    "mainquests.divinebeastvahnaboris.returnthethunderhelm",
                    "mainquests.divinebeastvahnaboris.meetrijuatlookout",
                    "mainquests.divinebeastvahnaboris.complete.subtasks.scimitarofthesevenanddaybreakeravailable",
                    "mainquests.divinebeastvahnaboris.complete"
                ],
                "incompletesteps": [
                    "mainquests.divinebeastvahnaboris.boardvahnaboris"
                ]
            },
            "divinebeastvahrudania": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.divinebeastvahrudania.begun",
                    "mainquests.divinebeastvahrudania.rescueyunobo.subtasks.blowuprockwall",
                    "mainquests.divinebeastvahrudania.rescueyunobo.subtasks.calmdownyunobo",
                    "mainquests.divinebeastvahrudania.rescueyunobo.subtasks.yunoboreturnstogoroncity",
                    "mainquests.divinebeastvahrudania.rescueyunobo",
                    "mainquests.divinebeastvahrudania.bridgeofeldin.subtasks.settriggerforbridgecutscene",
                    "mainquests.divinebeastvahrudania.talktobludo",
                    "mainquests.divinebeastvahrudania.bridgeofeldin.subtasks.calmdownyunobo",
                    "mainquests.divinebeastvahrudania.bridgeofeldin.subtasks.talktoyunobo",
                    "mainquests.divinebeastvahrudania.bridgeofeldin.subtasks.killthemoblins",
                    "mainquests.divinebeastvahrudania.bridgeofeldin.subtasks.getyunoboincannon",
                    "mainquests.divinebeastvahrudania.bridgeofeldin.subtasks.lowerthebridge",
                    "mainquests.divinebeastvahrudania.boardvahrudania.subtasks.getridofinvisiblewall",
                    "mainquests.divinebeastvahrudania.boardvahrudania.subtasks.strategizewithyunobo",
                    "mainquests.divinebeastvahrudania.boardvahrudania.subtasks.startchallengemusic",
                    "mainquests.divinebeastvahrudania.boardvahrudania.subtasks.startchallenge",
                    "mainquests.divinebeastvahrudania.boardvahrudania.subtasks.triggersentinels",
                    "mainquests.divinebeastvahrudania.boardvahrudania.subtasks.cannon1",
                    "mainquests.divinebeastvahrudania.boardvahrudania.subtasks.cannon2",
                    "mainquests.divinebeastvahrudania.boardvahrudania.subtasks.cannon3",
                    "mainquests.divinebeastvahrudania.boardvahrudania.subtasks.stopforcingboard",
                    "mainquests.divinebeastvahrudania.complete.subtasks.boulderbreakeravailable",
                    "mainquests.divinebeastvahrudania.complete"
                ],
                "incompletesteps": [
                    "mainquests.divinebeastvahrudania.bridgeofeldin.subtasks.allowboarding",
                    "mainquests.divinebeastvahrudania.bridgeofeldin",
                    "mainquests.divinebeastvahrudania.boardvahrudania"
                ]
            },
            "divinebeastvahruta": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.divinebeastvahruta.begun",
                    "mainquests.divinebeastvahruta.talktomuzu",
                    "mainquests.divinebeastvahruta.wearzoraarmor",
                    "mainquests.divinebeastvahruta.collectshockarrows",
                    "mainquests.divinebeastvahruta.rainstopped",
                    "mainquests.divinebeastvahruta.boardvahruta",
                    "mainquests.divinebeastvahruta.complete"
                ],
                "incompletesteps": []
            },
            "findthefairyfountain": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    "mainquests.findthefairyfountain.begun",
                    "mainquests.findthefairyfountain.complete"
                ]
            },
            "followthesheikahslate": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.followthesheikahslate.begun",
                    "mainquests.followthesheikahslate.complete"
                ],
                "incompletesteps": []
            },
            "forbiddencityentry": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.forbiddencityentry.begun",
                    "mainquests.forbiddencityentry.buygerudoclothes",
                    "mainquests.forbiddencityentry.complete"
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
                    "mainquests.freethedivinebeasts.begun",
                    "mainquests.freethedivinebeasts.freevahmedoh",
                    "mainquests.freethedivinebeasts.freevahnaboris",
                    "mainquests.freethedivinebeasts.freevahrudania",
                    "mainquests.freethedivinebeasts.freevahruta",
                    "mainquests.freethedivinebeasts.complete"
                ],
                "incompletesteps": []
            },
            "lockedmementos": {
                "begun": true,
                "complete": false,
                "completedsteps": [
                    "mainquests.lockedmementos.begun"
                ],
                "incompletesteps": [
                    "mainquests.lockedmementos.lightthefurnace",
                    "mainquests.lockedmementos.talktopurah",
                    "mainquests.lockedmementos.takeasnapofpurah",
                    "mainquests.lockedmementos.returntoimpa",
                    "mainquests.lockedmementos.complete"
                ]
            },
            "reachzorasdomain": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.reachzorasdomain.begun",
                    "mainquests.reachzorasdomain.sidonrivercutscene1",
                    "mainquests.reachzorasdomain.sidonrivercutscene2",
                    "mainquests.reachzorasdomain.sidonrivercutscene3",
                    "mainquests.reachzorasdomain.sidonrivercutscene4",
                    "mainquests.reachzorasdomain.sidonrivercutscene5",
                    "mainquests.reachzorasdomain.complete"
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
                    "mainquests.seekoutimpa.begun",
                    "mainquests.seekoutimpa.complete"
                ],
                "incompletesteps": []
            },
            "thechampionsballad": {
                "begun": true,
                "complete": false,
                "completedsteps": [
                    "mainquests.thechampionsballad.begun",
                    "mainquests.thechampionsballad.completethechampionsongs.championdarukssong",
                    "mainquests.thechampionsballad.completethechampionsongs.championrevalissong",
                    "mainquests.thechampionsballad.completethechampionsongs.championurbosassong"
                ],
                "incompletesteps": [
                    "mainquests.thechampionsballad.completethechampionsongs.championmiphassong",
                    "mainquests.thechampionsballad.completethechampionsongs",
                    "mainquests.thechampionsballad.returntotheshrineofresurrectionagain",
                    "mainquests.thechampionsballad.finaltrial.begun",
                    "mainquests.thechampionsballad.finaltrial.complete",
                    "mainquests.thechampionsballad.complete"
                ]
            },
            "theherossword": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    "mainquests.theherossword.begun",
                    "mainquests.theherossword.masterswordtaken",
                    "mainquests.theherossword.complete"
                ]
            },
            "theisolatedplateau": {
                "begun": true,
                "complete": true,
                "completedsteps": [
                    "mainquests.theisolatedplateau.begun",
                    "mainquests.theisolatedplateau.collectedonespiritorb",
                    "mainquests.theisolatedplateau.collectedfourspiritorbs",
                    "mainquests.theisolatedplateau.shrines.jabaij",
                    "mainquests.theisolatedplateau.shrines.kehnamut",
                    "mainquests.theisolatedplateau.shrines.omanau",
                    "mainquests.theisolatedplateau.shrines.owadaim",
                    "mainquests.theisolatedplateau.complete"
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
                "totalsteps": 3,
                "currentstep": 2
            }
        },
        "sidequests": {
            "agiftfromthemonks": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.agiftfromthemonks.begun',
                    'sidequests.agiftfromthemonks.tookcap',
                    'sidequests.agiftfromthemonks.tooktunic',
                    'sidequests.agiftfromthemonks.tooktrousers',
                    'sidequests.agiftfromthemonks.complete'
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
                    'sidequests.byfireflyslight.begun',
                    'sidequests.byfireflyslight.complete'
                ]
            },
            "findkheel": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.findkheel.begun',
                    'sidequests.findkheel.talktokheel',
                    'sidequests.findkheel.complete'
                ]
            },
            "flownthecoop": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.flownthecoop.begun',
                    'sidequests.flownthecoop.returnthecuccos',
                    'sidequests.flownthecoop.complete'
                ]
            },
            "robbiesresearch": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.robbiesresearch.begun',
                    'sidequests.robbiesresearch.introducedtojerrin',
                    'sidequests.robbiesresearch.blueflamefurnace.lit',
                    'sidequests.robbiesresearch.complete'
                ]
            },
            "slatedforupgrades": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.slatedforupgrades.begun',
                    'sidequests.slatedforupgrades.complete'
                ]
            },
            "thepricelessmaracas": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.thepricelessmaracas.begun',
                    'sidequests.thepricelessmaracas.complete'
                ]
            },
            "trialofthesword": {
                "begun": false,
                "complete": false,
                "completedsteps": [],
                "incompletesteps": [
                    'sidequests.trialofthesword.begun',
                    'sidequests.trialofthesword.talktodekutree',
                    'sidequests.trialofthesword.beginningtrials.complete',
                    'sidequests.trialofthesword.middletrials.complete',
                    'sidequests.trialofthesword.complete'
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
            subModelTest('mainquests', expectedJson.mainquests)
                .then(subModelTest('memories', expectedJson.memories))
                .then(subModelTest('sidequests', expectedJson.sidequests))
                .then(resolve);
        });
    });    
};
