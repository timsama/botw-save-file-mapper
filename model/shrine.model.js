module.exports = (() => {
    return {
        read: (name, saveFile, keypathReader, changeReader) => {
            const hasUnearthedEntries = !!keypathReader(`shrines.${name}.unearthed`);
            const hasMonsterBaseEntries = !!keypathReader(`shrines.${name}.monsterbase`);
            const isChampionsBallad = !!keypathReader(`shrines.${name}.ischampionsballad`);
            const hasFoundFlag = !!keypathReader(`shrines.${name}.found`);
            const hasCompleteFlag = !!keypathReader(`shrines.${name}.complete`);

            let keysToRead = [
                `shrines.${name}.active`,
                `shrines.${name}.pedestal.on`
            ];

            if (hasFoundFlag) {
                keysToRead.push(`shrines.${name}.found`);
            }
            if (hasCompleteFlag) {
                keysToRead.push(`shrines.${name}.complete`);
            }
            if (hasUnearthedEntries) {
                keysToRead.push(`shrines.${name}.unearthed`);
            }
            if (hasMonsterBaseEntries) {
                keysToRead.push(`shrines.${name}.monsterbase.conquered`);
            }

            const mapValues = changeReader(keysToRead);

            const shrineJson = {
                active: mapValues[`shrines.${name}.active`],
                pedestal: mapValues[`shrines.${name}.pedestal.on`]
            };

            if (hasFoundFlag) {
                shrineJson.found = mapValues[`shrines.${name}.found`];
            }
            if (hasCompleteFlag) {
                shrineJson.complete = mapValues[`shrines.${name}.complete`];
            }
            if (hasUnearthedEntries) {
                shrineJson.unearthed = mapValues[`shrines.${name}.unearthed`];
            }
            if (hasMonsterBaseEntries) {
                shrineJson.monsterbaseconquered = mapValues[`shrines.${name}.monsterbase.conquered`];
            }
            if (isChampionsBallad) {
                shrineJson.ischampionsballad = isChampionsBallad;

            }

            return shrineJson;
        },
        write: (name, modelJson, saveFile, keypathReader, changeWriter) => {
            if (!modelJson) {
                return Promise.resolve();
            }
            const hasUnearthedEntries = !!keypathReader(`shrines.${name}.unearthed`);
            const hasMonsterBaseEntries = !!keypathReader(`shrines.${name}.monsterbase`);
            const hasFoundFlag = !!keypathReader(`shrines.${name}.found`);
            const hasCompleteFlag = !!keypathReader(`shrines.${name}.complete`);

            const keys = [];

            const addKeyBranches = (val, baseKey, extensionTrue, extensionFalse) => {
                if (val === true) {
                    keys.push(`${baseKey}.${extensionTrue}`);
                }
                if (val === false) {
                    keys.push(`${baseKey}.${extensionFalse}`);
                }
            };

            addKeyBranches(modelJson.active, `shrines.${name}`, 'active', 'inactive');
            addKeyBranches(modelJson.pedestal, `shrines.${name}.pedestal`, 'on', 'off');

            hasFoundFlag && addKeyBranches(modelJson.found, `shrines.${name}`, 'found', 'notfound');
            hasCompleteFlag && addKeyBranches(modelJson.complete, `shrines.${name}`, 'complete', 'incomplete');
            hasMonsterBaseEntries && addKeyBranches(modelJson.monsterbaseconquered, `shrines.${name}.monsterbase`, 'conquered', 'unconquered');
            hasUnearthedEntries && addKeyBranches(modelJson.unearthed, `shrines.${name}`, 'unearthed', 'buried');
            
            return changeWriter(keys);
        }
    };
})();
