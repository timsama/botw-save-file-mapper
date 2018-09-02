module.exports = (() => {
const SaveFile = (() => {
    return {
        read: (saveFile) => {
            return {
                inventory: Inventory.read(saveFile),
                runes: Runes.read(saveFile),
            };
        },
        write: (modelJson, saveFile) => {
            Inventory.write(modelJson.inventory, saveFile);
            Inventory.write(modelJson.inventory, saveFile).then(() => {
                return Runes.write(modelJson.runes, saveFile);
            });
        }
    };
})();})();

module.exports = SaveFile;
