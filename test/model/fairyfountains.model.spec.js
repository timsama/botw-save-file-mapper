module.exports = (() => {
    const subModelTest = require('./model-test-template.js');

    const expectedJson = {
        "cotera": {
            "unlocked": true
        },
        "kaysa": {
            "unlocked": true
        },
        "malanya": {
            "unlocked": true
        },
        "mija": {
            "unlocked": true
        },
        "tera": {
            "unlocked": true
        },
        "powerlevel": 4
    };

    return subModelTest('fairyfountains', expectedJson);
})();
