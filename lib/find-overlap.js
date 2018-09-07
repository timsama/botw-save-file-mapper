module.exports = (changesToUnapply1, changesToApply1, changesToUnapply2, changesToApply2, enforceSameValues) => {
    const getAddressMap = changes => {
        const addressMap = {};
        changes.forEach(change => addressMap[change.offset] = change.value);
        return addressMap;
    };
    
    const getFilter = (otherAddressMap, enforceSameValues) => {
        if (enforceSameValues) {
            return change => otherAddressMap[change.offset] == change.value;
        } else {
            return change => otherAddressMap[change.offset] !== undefined;
        }
    };

    const getFilteredOutput = (plusChanges, minusChanges, otherPlusMap, otherMinusMap) => {
        const minusLines = minusChanges.filter(getFilter(otherMinusMap, enforceSameValues));
        const plusLines = plusChanges.filter(getFilter(otherPlusMap, enforceSameValues));
        const plusMap = getAddressMap(plusLines);
        const minusLinesFinal = minusLines.filter(getFilter(plusMap, false));

        return {
            minusLines: minusLinesFinal,
            plusLines: plusLines
        };
    };

    const minusMap1 = getAddressMap(changesToUnapply1);
    const minusMap2 = getAddressMap(changesToUnapply2);
    const plusMap1 = getAddressMap(changesToApply1);
    const plusMap2 = getAddressMap(changesToApply2);

    return {
        file1: getFilteredOutput(changesToApply1, changesToUnapply1, plusMap2, minusMap2),
        file2: getFilteredOutput(changesToApply2, changesToUnapply2, plusMap1, minusMap1)
    };
}