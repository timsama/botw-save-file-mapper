module.exports = () => {
    const subModelTest = require('./model-test-template.js');

    const expectedJson = {
        "time": "07:25 AM",
        "bloodmoon": {
            "counter": "01:45:30",
            "tonight": true
        }
    };

    return subModelTest('clock', expectedJson);
};
