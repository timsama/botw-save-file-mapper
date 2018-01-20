const readline = require('readline-sync');
const query = require('cli-interact').getYesNo;
const fs = require('fs');
const buildHexDiff = require('./build-hex-diff.js');
const CONFIG = require('./config.js');
const folderUtils = require('./folder-utils.js');

const _path = process.argv[3] || CONFIG.savepath;
const path = (_path.slice(-1) === '/') ? _path : _path + '/';
const saveFilepath = `${path}game_data.sav`;
const saveFileBackup = `${path}backup.sav`;
const beforeFilepath = `${path}game_data_before.sav`;
const afterFilepath = `${path}game_data_after.sav`;

const nameQuestionString = 'Name of change set: ';

var name = process.argv[2] || readline.question(nameQuestionString);
var isSure = !!name;
while (!name && !isSure) {
	isSure = query('Unnamed changes will likely be later overwritten. Are you sure?');
	if (!isSure) {
		name = readline.question(nameQuestionString);
	} else {
		name = 'unnamed';
	}
}

const filename = `raw/${name}.raw.changes`;
const filepath = path + filename;

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
folderUtils.buildFoldersIfTheyDoNotExist(filename);
buildHexDiff(filepath, beforeFilepath, afterFilepath);
console.log('Successfully created raw changefile!\nCleaning up...')
cleanup();
console.log('...done.')
