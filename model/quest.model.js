module.exports = (questCategory) => {
    const getOrderedStepKeys = (name, keypathReader) => {
        const begunKey = `${questCategory}.${name}.begun`;
        const completeKey = `${questCategory}.${name}.complete`;

        const alreadyRetrievedKeys = {};

        const getPreviousStepKey = (key) => {
            if (alreadyRetrievedKeys[key]) {
                return [];
            }

            alreadyRetrievedKeys[key] = true;

            if (key === begunKey) {
                return undefined;
            }

            const currentStep = keypathReader(key);

            const allDependencies = (currentStep.harddependencies || [])
                .concat(currentStep.softdependencies || []);

            const previousSteps = allDependencies.filter(step => {
                const [depCategory, depName] = step.split('.');
                return step !== begunKey && depCategory === questCategory && depName === name;
            });

            return previousSteps || [begunKey];
        };

        const stepKeys = [completeKey];
        let currentKeys = getPreviousStepKey(completeKey);
        while (currentKeys.length > 0) {
            const nextKey = currentKeys.pop();
            stepKeys.push(nextKey);
            currentKeys = getPreviousStepKey(nextKey).concat(currentKeys);
        }
        stepKeys.push(begunKey);

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
            if (!modelJson) {
                return Promise.resolve();
            }
            const keys = modelJson.completedsteps;

            return changeWriter(keys);
        }
    };
};
