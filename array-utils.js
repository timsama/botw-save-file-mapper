module.exports = (() => {
    const arrayUtils = {
        flatten: (arr) => {
            return arr.reduce((acc, el) => {
                if (Array.isArray(el)) {
                    return acc.concat(arrayUtils.flatten(el));
                } else {
                    return acc.concat(el);
                }
            }, []);
        }
    };
    return arrayUtils;
})();
