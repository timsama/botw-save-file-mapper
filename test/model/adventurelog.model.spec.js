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
            "slatedforupgrades": {
                "totalsteps": 3,
                "currentstep": 2
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
                .then(resolve);
        });
    });    
};
