const inventoryModelTest = require('./inventory-model-test.js');

const modelJson = {
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
};

inventoryModelTest('armor', modelJson);
