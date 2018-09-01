const inventoryModelTest = require('./inventory-model-test.js');

const modelJson = {
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
};

inventoryModelTest('keyitems', modelJson);
