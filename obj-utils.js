module.exports = (() => {
    return {
        decorate: (obj) => {
            const functions = [
                'copy',
                'eject',
                'every',
                'filter',
                'find',
                'forEach',
                'getSortedKeys',
                'includes',
                'map',
                'reduce',
                'some'
            ];
            const copy = obj => {
                const keys = getSortedKeys(obj);
                let cpy = {};
                
                keys.forEach(key => {
                    if (Array.isArray(obj[key])) {
                        cpy[key] = obj[key].slice();
                    } else if (typeof obj[key] === 'object') {
                        cpy[key] = copy(obj[key]);
                    } else {
                        cpy[key] = obj[key];
                    }
                });

                return decorate(cpy);
            };
            const eject = obj => {
                let newObj = {};
                
                const keys = getSortedKeys(obj);
                keys.forEach(key => {
                    newObj[key] = obj[key];
                });
                
                return newObj;
            };
            const every = (obj, func) => {
                const keys = getSortedKeys(obj);
                return keys.every(key => func(obj[key]));
            };
            const filter = (obj, func) => {
                let newObj = {};
                
                forEach(obj, (val, key) => {
                    if (func(val)) {
                        newObj[key] = val;
                    }
                });

                return decorate(newObj);
            };
            const find = (obj, func) => {
                const keys = getSortedKeys(obj);
                const foundKey = keys.find(key => func(obj[key]));
                return [foundKey].map(key => obj[key])[0];
            };
            const forEach = (obj, func) => {
                const keys = getSortedKeys(obj);
                keys.forEach(key => func(obj[key], key));
            };
            const getSortedKeys = obj => {
                if (!obj) {
                    return [];
                } else {                
                    return Object.keys(obj).filter(key => {
                        return !functions.includes(key)
                    }).sort();
                }
            };
            const includes = (obj, prop) => {
                return some(obj, p => p === prop);
            };
            const map = (obj, func) => {
                let newObj = {};
                
                const keys = getSortedKeys(obj);
                keys.forEach(key => {
                    newObj[key] = func(obj[key]);
                });
                
                return decorate(newObj);
            };
            const reduce = (obj, func, start) => {
                const keys = getSortedKeys(obj);
                
                const result = keys.reduce((acc, next) => {
                    return func(acc, next);
                }, start);

                if (typeof result === typeof {}) {
                    return decorate(result);
                } else {
                    return result;
                }
            };
            const some = (obj, func) => {
                const keys = getSortedKeys(obj);
                return keys.some(key => func(obj[key]));
            };

            const decorate = obj => {
                let cpy = {};
                const keys = getSortedKeys(obj);
                keys.forEach(key => {
                    cpy[key] = obj[key];
                });

                cpy['copy'] = copy.bind(undefined, cpy);
                cpy['eject'] = eject.bind(undefined, cpy);
                cpy['every'] = every.bind(undefined, cpy);
                cpy['filter'] = filter.bind(undefined, cpy);
                cpy['find'] = find.bind(undefined, cpy);
                cpy['forEach'] = forEach.bind(undefined, cpy);
                cpy['getSortedKeys'] = getSortedKeys.bind(undefined, cpy);
                cpy['includes'] = includes.bind(undefined, cpy);
                cpy['map'] = map.bind(undefined, cpy);
                cpy['reduce'] = reduce.bind(undefined, cpy);
                cpy['some'] = some.bind(undefined, cpy);

                return cpy;
            };

            return decorate(obj);
        }
    };
})();
