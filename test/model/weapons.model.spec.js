const inventoryModelTest = require('./inventory-model-test.js');

const modelJson = {
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
};

inventoryModelTest('weapons', modelJson);
