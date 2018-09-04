module.exports = (questCategory) => {
    const getOrderedStepKeys = (name, keypathReader) => {
        const begunKey = `${questCategory}.${name}.begun`;
        const completeKey = `${questCategory}.${name}.complete`;

        const getPreviousStepKey = (key) => {
            if (key === begunKey) {
                return undefined;
            }

            const currentStep = keypathReader(key);

            const allDependencies = (currentStep.harddependencies || [])
                .concat(currentStep.softdependencies || []);

            const [previousStep] = allDependencies.filter(step => {
                const [depCategory, depName] = step.split('.');
                return step !== begunKey && depCategory === questCategory && depName === name;
            });

            return previousStep || begunKey;
        };

        const stepKeys = [completeKey];
        let currentKey = getPreviousStepKey(completeKey);
        while(currentKey) {
            stepKeys.push(currentKey);
            currentKey = getPreviousStepKey(currentKey);
        }

        return stepKeys.reverse();
    };

    return {
        read: (name, saveFile, keypathReader, changeReader) => {
            const allSteps = getOrderedStepKeys(name, keypathReader);

            const mapValues = changeReader(allSteps);

            const begunKey = `${questCategory}.${name}.begun`;
            const completeKey = `${questCategory}.${name}.complete`;

            const rewards = keypathReader(completeKey).rewards;

            const doneSteps = allSteps.filter(step => mapValues[step]);
            const notDoneSteps = allSteps.filter(step => !mapValues[step]);

            return {
                begun: mapValues[begunKey],
                complete: mapValues[completeKey],
                completedsteps: doneSteps,
                incompletesteps: notDoneSteps,
                rewards: rewards
            };
        },
        write: (name, modelJson, saveFile, keypathReader, changeWriter) => {
            const keys = modelJson.completedsteps;

            return changeWriter(keys);
        }
    };
};
