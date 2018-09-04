const inventoryModelSpec = require('./inventory.model.spec.js');
const runesModelSpec = require('./runes.model.spec.js');
const mapModelSpec = require('./map.model.spec.js');

inventoryModelSpec()
    .then(runesModelSpec)
    .then(() => require('./clock.model.spec.js'))
    .then(() => require('./fairyfountains.model.spec.js'))
    .then(() => require('./stats.model.spec.js'))
    .then(mapModelSpec)
