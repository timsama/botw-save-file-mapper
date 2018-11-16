const inventoryModelSpec = require('./inventory.model.spec.js');
const worldMapModelSpec = require('./worldmap.model.spec.js');
const adventureLogModelSpec = require('./adventurelog.model.spec.js');

inventoryModelSpec()
    .then(adventureLogModelSpec)
    .then(worldMapModelSpec)
