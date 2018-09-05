module.exports = (() => {
    const Inventory = require('./inventory.model.js');
    const Runes = require('./runes.model.js');
    const Map = require('./map.model.js');
    const Clock = require('./clock.model.js');
    const FairyFountains = require('./fairyfountains.model.js');
    const Stats = require('./stats.model.js');
    const AdventureLog = require('./adventurelog.model.js');

    return {
        read: (saveFile) => {
            return {
                inventory: Inventory.read(saveFile),
                runes: Runes.read(saveFile),
                map: Map.read(saveFile),
                clock: Clock.read(saveFile),
                fairyfountains: FairyFountains.read(saveFile),
                stats: Stats.read(saveFile),
                adventurelog: AdventureLog.read(saveFile)
            };
        },
        write: (modelJson, saveFile) => {
            return Inventory.write(modelJson.inventory, saveFile).then(() => {
                return Runes.write(modelJson.runes, saveFile);
            }).then(() => {
                return Map.write(modelJson.map, saveFile);
            }).then(() => {
                return Clock.write(modelJson.clock, saveFile);
            }).then(() => {
                return FairyFountains.write(modelJson.fairyfountains, saveFile);
            }).then(() => {
                return Stats.write(modelJson.stats, saveFile);
            }).then(() => {
                return AdventureLog.write(modelJson.adventurelog, saveFile);
            });
        }
    };
})();
