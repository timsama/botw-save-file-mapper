const query = require('cli-interact').getYesNo;
const fs = require('fs');
const saveFileUtils = require('./save-file-utils.js');
const CONFIG = require('./config.js');
const folderUtils = require('./folder-utils.js');

const ResultExporter = (results, name) => {
    const findingsFilepath = `${CONFIG.savepath}changes.findings`;
    const exportFilepath = `${CONFIG.savepath}changes/${name}.changes`;
    const toHexString = saveFileUtils.toHexString;

    folderUtils.buildFoldersIfTheyDoNotExist(`changes/${name}`);

    const findings = results.map((result) => {
        console.log(`Found it! 0x${toHexString(result.offset)}: ${toHexString(result.value)}`);
        return `${name} is controlled by setting 0x${toHexString(result.offset)} to ${toHexString(result.value)}`;
    }).join('\n') + '\n';
    if (results.length > 0) {
        fs.appendFileSync(findingsFilepath, findings);

        if (query('Would you like to export this result?')) {
            const output = results.map((result) => {
                return `+0x${toHexString(result.offset)} ${toHexString(result.value)}`;
            }).join('\n');
            fs.writeFileSync(exportFilepath, output);
        }
    }
};

module.exports = ResultExporter;
