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
            "followthesheikahslate": {
                "totalsteps": 2,
                "currentstep": 2
            },
            "theisolatedplateau": {
                "totalsteps": 7,
                "currentstep": 7
            },
            "seekoutimpa": {
                "totalsteps": 1,
                "currentstep": 1
            },
            "lockedmementos": {
                "totalsteps": 4,
                "currentstep": 1
            },
            "capturedmemories": {
                "totalsteps": 13,
                "currentstep": 0
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
            subModelTest('memories', expectedJson.memories)
                .then(subModelTest('sidequests', expectedJson.sidequests))
                .then(resolve);
        });
    });    
};
