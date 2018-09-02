const SaveFile = (() => {
    return {
        read: (saveFile) => {
            return {
                inventory: Inventory.read(saveFile),
                runes: Runes.read(saveFile),
                map: Map.read(saveFile),
            };
        },
        write: (modelJson, saveFile) => {
            Inventory.write(modelJson.inventory, saveFile).then(() => {
                return Runes.write(modelJson.runes, saveFile);
            }).then(() => {
                return Map.write(modelJson.map, saveFile);
            });
        }
    };
})();

module.exports = SaveFile;
