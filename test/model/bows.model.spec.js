const inventoryModelTest = require('./inventory-model-test.js');

const modelJson = {
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
};

inventoryModelTest('bows', modelJson);
