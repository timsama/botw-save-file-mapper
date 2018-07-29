const float12 = require('./float12.js');

module.exports = (() => {
    return (time) => {
        const seconds = ((time) => {
            if (time.toString().indexOf(':') === -1) {
                return time;
            } else {
                const [minutes, seconds] = time.split(':').map(x => parseInt(x));
                return minutes * 60 + seconds;
            }
        })(time);
        
        return (0x4 << 28) | float12.encode(seconds);
    };
})();