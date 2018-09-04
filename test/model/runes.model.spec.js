module.exports = (() => {
    const subModelTest = require('./model-test-template.js');

    const expectedJson = {
        "selectedIndex": 1,
        "enabled": true,
        "bombs": {
            "enabled": true,
            "plus": false
        },
        "stasis":  {
            "enabled": true,
            "plus": true
        },
        "sheikahsensor": {
            "enabled": false,
            "plus": false
        },
        "magnesis": {
            "enabled": true
        },
        "cryonis": {
            "enabled": true
        },
        "camera": {
            "enabled": true
        },
        "mastercyclezero": {
            "enabled": true
        },
    };

    return subModelTest('runes', expectedJson);
})();
