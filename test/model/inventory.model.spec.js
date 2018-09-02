const assert = require('assert');
const Inventory = require('../../model/inventory.model.js');
const md5 = require('md5-file').sync;
const fs = require('fs');
const ModelTestUtils = require('./model-test-utils.js');
const subModelTest = require('./inventory-model-test.js');

const baseFilePath = './test/blank.sav';
const testFilePath = './test/inventory.test.sav';

const expectedFile = './test/inventory.model.spec.sav';

const inventoryJson = {
    "weapons": {
        "stash": 10,
        "slots": [
            {
                "name": "mightylynelsword",
                "durability": 3200,
                "equipped": true,
                "bonus": {
                    "type": "attack",
                    "amount": 10
                }
            },
            {
                "name": "savagelynelsword",
                "durability": 4100,
                "equipped": false,
                "bonus": {
                    "type": "criticalplus",
                    "amount": 15
                }
            },
            {
                "name": "royalhalberd",
                "durability": 3200,
                "equipped": false,
                "bonus": {
                    "type": "durabilityplus",
                    "amount": 20
                }
            },
            {
                "name": "springloadedhammer",
                "durability": 3200,
                "equipped": false,
                "bonus": {
                    "type": "longthrow",
                    "amount": 20
                }
            },
            {
                "name": "ancientshortsword",
                "durability": 4500,
                "equipped": false
            },
            {
                "name": "greatfrostblade",
                "durability": 4000,
                "equipped": false
            },
            {
                "name": "mightylynelsword",
                "durability": 3200,
                "equipped": false,
                "bonus": {
                    "type": "attack",
                    "amount": 10
                }
            },
            {
                "name": "mightylynelsword",
                "durability": 3200,
                "equipped": false,
                "bonus": {
                    "type": "attack",
                    "amount": 10
                }
            },
            {
                "name": "mightylynelsword",
                "durability": 3200,
                "equipped": false,
                "bonus": {
                    "type": "attack",
                    "amount": 10
                }
            },
            {
                "name": "mightylynelsword",
                "durability": 3200,
                "equipped": false,
                "bonus": {
                    "type": "attack",
                    "amount": 10
                }
            }
        ]
    },
    "bows": {
        "stash": 6,
        "slots": [
            {
                "name": "goldenbow",
                "durability": 4000,
                "equipped": false
            },
            {
                "name": "phrenicbow",
                "durability": 4000,
                "equipped": false,
                "bonus": {
                    "type": "durability",
                    "amount": 15
                }
            },
            {
                "name": "savagelynelbow",
                "durability": 4000,
                "equipped": true,
                "bonus": {
                    "type": "fiveshotsplus",
                    "amount": 5
                }
            },
            {
                "name": "bowoflight",
                "durability": 4000,
                "equipped": false
            }
        ]
    },
    "arrows": {
        "slots": [
            {
                "name": "arrow",
                "quantity": 999,
                "equipped": false
            },
            {
                "name": "firearrow",
                "equipped": true,
                "quantity": 100
            },
            {
                "name": "icearrow",
                "quantity": 200,
                "equipped": false
            },
            {
                "name": "shockarrow",
                "quantity": 300,
                "equipped": false
            },
            {
                "name": "bombarrow",
                "quantity": 400,
                "equipped": false
            },
            {
                "name": "ancientarrow",
                "quantity": 500,
                "equipped": false
            }
        ]
    },
    "shields": {
        "stash": 8,
        "slots": [
            {
                "name": "hylianshield",
                "durability": 80000,
                "equipped": true
            },
            {
                "name": "royalguardsshield",
                "durability": 10000,
                "equipped": false,
                "bonus": {
                    "type": "shieldguardplus",
                    "amount": 50
                }
            },
            {
                "name": "bokoshield",
                "durability": 500,
                "equipped": false
            },
            {
                "name": "daybreaker",
                "durability": 7000,
                "equipped": false
            },
            {
                "name": "travelersshield",
                "durability": 1000,
                "equipped": false,
                "bonus": {
                    "type": "shieldguard",
                    "amount": 20
                }
            },
            {
                "name": "ancientshield",
                "durability": 5000,
                "equipped": false
            }
        ]
    },
    "armor": {
        "slots": [
            {
                "name": "bokoblinmask",
                "color": "purple",
                "equipped": true
            },
            {
                "name": "phantomarmor",
                "color": "orange",
                "equipped": true
            },
            {
                "name": "snowboots",
                "color": "green",
                "equipped": true
            },
            {
                "name": "korokmask",
                "equipped": false
            }
        ]
    },
    "materials": {
        "slots": [
            {
                "name": "diamond",
                "quantity": 1
            },
            {
                "name": "hyrulebass",
                "quantity": 2
            },
            {
                "name": "hyruleherb",
                "quantity": 3
            },
            {
                "name": "mightythistle",
                "quantity": 4
            },
            {
                "name": "octoballoon",
                "quantity": 5
            },
            {
                "name": "rawmeat",
                "quantity": 6
            },
            {
                "name": "ruby",
                "quantity": 7
            },
            {
                "name": "staminokabass",
                "quantity": 8
            },
            {
                "name": "topaz",
                "quantity": 9
            },
            {
                "name": "wood",
                "quantity": 10
            }
        ]
    },
    "food": {
        "slots": [
            {
                "name": "simmeredfruit",
                "hearts": "fullrecovery",
                "bonus": {
                    "type": "hearty",
                    "amount": 8
                },
                "stackable": false,
                "quantity": 1
            },
            {
                "name": "friedwildgreens",
                "hearts": 1.25,
                "bonus": {
                    "type": "hasty",
                    "amount": 3,
                    "duration": "10:30"
                },
                "stackable": false,
                "quantity": 1
            },
            {
                "name": "steamedfish",
                "hearts": 4,
                "stackable": false,
                "quantity": 1
            },
            {
                "name": "searedprimesteak",
                "hearts": 2.25,
                "quantity": 99,
                "stackable": true
            }
        ]
    },
    "keyitems": {
        "slots": [
            {
                "name": "paraglider",
                "unique": true,
                "stackable": false,
                "quantity": 1
            },
            {
                "name": "royalbridle",
                "unique": true,
                "stackable": false,
                "quantity": 1
            },
            {
                "name": "sheikahslate",
                "unique": true,
                "stackable": false,
                "quantity": 1
            },
            {
                "name": "spiritorb",
                "unique": false,
                "quantity": 99,
                "stackable": true
            }
        ]
    }
};

describe('inventory.model.js', function() {
    afterEach(function() {
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
    });

    it('should write the inventory to the save file correctly', function() {
        fs.copyFileSync(baseFilePath, testFilePath);

        return Inventory.write(inventoryJson, testFilePath).then(() => {
            assert(md5(testFilePath) == md5(expectedFile), `${md5(testFilePath)} !== ${md5(expectedFile)}`);
        });
    }).timeout(10000);

    it('should read the inventory from the save file correctly', function() {
        const actualInventoryJson = Inventory.read(expectedFile);

        ModelTestUtils.doKeysMatch(inventoryJson, actualInventoryJson, 'inventory');
    });

    subModelTest('weapons', inventoryJson.weapons)
        .then(subModelTest('bows', inventoryJson.bows))
        .then(subModelTest('arrows', inventoryJson.arrows))
        .then(subModelTest('shields', inventoryJson.shields))
        .then(subModelTest('armor', inventoryJson.armor))
        .then(subModelTest('materials', inventoryJson.materials))
        .then(subModelTest('food', inventoryJson.food))
        .then(subModelTest('keyitems', inventoryJson.keyitems));
});