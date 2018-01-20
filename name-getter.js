module.exports = (() => {
    const readline = require('readline-sync');
    const query = require('cli-interact').getYesNo;

    return (defaultInput, nameQuestionString, areYouSureString) => {
        var name = defaultInput || readline.question(nameQuestionString);
        
        var isSure = !!name;
        while (!name && !isSure) {
            isSure = query(areYouSureString);
            if (!isSure) {
                name = readline.question(nameQuestionString);
            } else {
                name = 'unnamed';
            }
        }

        return name;
    };
})();