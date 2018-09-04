const inventoryModelSpec = require('./inventory.model.spec.js');
const mapModelSpec = require('./map.model.spec.js');
const adventureLogModelSpec = require('./adventurelog.model.spec.js');

inventoryModelSpec()
    .then(adventureLogModelSpec)
    .then(mapModelSpec)
