module.exports = (() => {
    const Inventory = require('./inventory.model.js');
    const Runes = require('./runes.model.js');
    const WorldMap = require('./worldmap.model.js');
    const Clock = require('./clock.model.js');
    const FairyFountains = require('./fairyfountains.model.js');
    const Stats = require('./stats.model.js');
    const AdventureLog = require('./adventurelog.model.js');
    const Horses = require('./horses.model.js');
    const SkipHardDependencies = require('./skipharddependencies.model.js');
    const SkipSoftDependencies = require('./skipsoftdependencies.model.js');

    return {
        read: (saveFile) => {
            return {
                inventory: Inventory.read(saveFile),
                runes: Runes.read(saveFile),
                map: WorldMap.read(saveFile),
                clock: Clock.read(saveFile),
                fairyfountains: FairyFountains.read(saveFile),
                stats: Stats.read(saveFile),
                adventurelog: AdventureLog.read(saveFile),
                horses: Horses.read(saveFile),
                skipharddependencies: SkipSoftDependencies.read(saveFile),
                skipsoftdependencies: SkipSoftDependencies.read(saveFile)
            };
        },
        write: (modelJson, saveFile, options) => {
            return Inventory.write(modelJson.inventory, saveFile, options).then(() => {
                return Runes.write(modelJson.runes, saveFile, options);
            }).then(() => {
                return WorldMap.write(modelJson.map, saveFile, options);
            }).then(() => {
                return Clock.write(modelJson.clock, saveFile, options);
            }).then(() => {
                return FairyFountains.write(modelJson.fairyfountains, saveFile, options);
            }).then(() => {
                return Stats.write(modelJson.stats, saveFile, options);
            }).then(() => {
                return AdventureLog.write(modelJson.adventurelog, saveFile, options);
            }).then(() => {
                return SkipHardDependencies.write(modelJson.skipharddependencies, saveFile, options);
            }).then(() => {
                return SkipSoftDependencies.write(modelJson.skipsoftdependencies, saveFile, options);
            });
        }
    };
})();
