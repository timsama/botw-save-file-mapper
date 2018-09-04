const SaveFile = (() => {
    return {
        read: (saveFile) => {
            return {
                inventory: Inventory.read(saveFile),
                runes: Runes.read(saveFile),
                map: Map.read(saveFile),
                clock: Clock.read(saveFile),
            };
        },
        write: (modelJson, saveFile) => {
            Inventory.write(modelJson.inventory, saveFile).then(() => {
                return Runes.write(modelJson.runes, saveFile);
            }).then(() => {
                return Map.write(modelJson.map, saveFile);
            }).then(() => {
                return Clock.write(modelJson.clock, saveFile);
            });
        }
    };
})();

module.exports = SaveFile;
const Inventory = require('./inventory.model.js');
const Runes = require('./runes.model.js');
const Map = require('./map.model.js');
const Clock = require('./clock.model.js');
