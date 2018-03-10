module.exports = (name) => {
	const readline = require('readline-sync');
	const fs = require('fs');
	const buildHexDiff = require('./build-hex-diff.js');
	const CONFIG = require('./config.js');
	const folderUtils = require('./folder-utils.js');

	const saveFilepath = `${CONFIG.savepath}game_data.sav`;
	const saveFileBackup = `${CONFIG.tempoutputpath}backup.sav`;
	const beforeFilepath = `${CONFIG.tempoutputpath}game_data_before.sav`;
	const afterFilepath = `${CONFIG.tempoutputpath}game_data_after.sav`;

	const filename = `${name}.raw.changes`;
	const filepath = CONFIG.rawchangespath + filename;

	const beforeHexViewBuilder = () => {
		readline.question('Please save your game immediately before the change for which you wish to build a changefile. Then press [Enter] to continue.');

		fs.copyFileSync(saveFilepath, beforeFilepath);
	};

	const afterHexViewBuilder = () => {
		readline.question('Please save your game immediately after the change for which you wish to build a changefile. Then press [Enter] to continue.');

		fs.copyFileSync(saveFilepath, afterFilepath);
	};

	const cleanup = () => {
		if (fs.existsSync(saveFileBackup)) {
			fs.unlinkSync(saveFileBackup);
		}
		fs.renameSync(saveFilepath, saveFileBackup);
		fs.renameSync(beforeFilepath, saveFilepath);
		fs.unlinkSync(saveFileBackup);
		fs.unlinkSync(afterFilepath);
	};

	beforeHexViewBuilder();
	afterHexViewBuilder();
	folderUtils.buildFoldersIfTheyDoNotExist(filepath);
	buildHexDiff(filepath, beforeFilepath, afterFilepath);
	console.log('Successfully created raw changefile!\nCleaning up...');
	cleanup();
	console.log('...done.');
}
