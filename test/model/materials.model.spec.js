const inventoryModelTest = require('./inventory-model-test.js');

const modelJson = {
    "slots": [
        {
            "name": "diamond",
            "quantity": 998
        },
        {
            "name": "wood",
            "quantity": 100
        },
        {
            "name": "topaz",
            "quantity": 200
        },
        {
            "name": "rawmeat",
            "quantity": 300
        },
        {
            "name": "ruby",
            "quantity": 400
        },
        {
            "name": "octoballoon",
            "quantity": 500
        },
        {
            "name": "staminokabass",
            "quantity": 600
        },
        {
            "name": "hyrulebass",
            "quantity": 600
        },
        {
            "name": "hyruleherb",
            "quantity": 600
        },
        {
            "name": "mightythistle",
            "quantity": 600
        }
    ]
};

inventoryModelTest('materials', modelJson);
