module.exports = (() => {
    return {
        read: (saveFile) => {
            return {
                inventory: Inventory.read(saveFile)
            };
        },
        write: (modelJson, saveFile) => {
            Inventory.write(modelJson.inventory, saveFile);
        }
    };
})();