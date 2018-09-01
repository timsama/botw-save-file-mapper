const inventoryModelTest = require('./inventory-model-test.js');

const modelJson = {
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
};

inventoryModelTest('arrows', modelJson);
