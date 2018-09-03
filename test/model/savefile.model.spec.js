const inventoryModelSpec = require('./inventory.model.spec.js');
const runesModelSpec = require('./runes.model.spec.js');
const mapModelSpec = require('./map.model.spec.js');

inventoryModelSpec()
    .then(runesModelSpec)
    .then(mapModelSpec);
