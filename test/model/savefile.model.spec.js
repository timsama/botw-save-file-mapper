const inventoryModelSpec = require('./inventory.model.spec.js');
const mapModelSpec = require('./map.model.spec.js');

inventoryModelSpec()
    .then(mapModelSpec)
