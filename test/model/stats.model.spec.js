module.exports = (() => {
    const subModelTest = require('./model-test-template.js');

    const expectedJson = {
        shrinescompleted: 67,
        heartcontainers: 15,
        staminavessels: 9,
        heartsfilled: 13.75,
        rupees: 9876
    };

    return subModelTest('stats', expectedJson);
})();
