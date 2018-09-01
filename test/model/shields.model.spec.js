const inventoryModelTest = require('./inventory-model-test.js');

const modelJson = {
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
};

inventoryModelTest('shields', modelJson);
