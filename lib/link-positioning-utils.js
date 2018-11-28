module.exports = (saveFilepath) => {
    const offsetChecker = require('../lib/offset-checker.js');
    const float32 = require('../encoders_decoders/float32.js');

    const LinkPositioningUtils = {
        getDegreesFromSouth: () => {
            const degrees = float32.decode(offsetChecker(0x0006ea68, saveFilepath));
            return degrees;
        },
        getPosition: () => {
            const x = float32.decode(offsetChecker(0x000c3bf0, saveFilepath));
            const y = float32.decode(offsetChecker(0x000c3c00, saveFilepath));
            const z = float32.decode(offsetChecker(0x000c3bf8, saveFilepath));
            return { x, y, z };
        },
        getRadiansFromSouth: () => {
            const degrees = float32.decode(offsetChecker(0x0006ea68, saveFilepath));
            const radians = (degrees * Math.PI) / 180.0;
            return radians;
        },
        getCorrectMountPosition: () => {
            const linkPos = LinkPositioningUtils.getPosition();
            const radians = LinkPositioningUtils.getRadiansFromSouth();
            const length = 2.0012206808014352;
            const dx = length * Math.sin(radians);// - (Math.cos(radians) + 1) * 0.36;
            const dy = length * Math.cos(radians) - 0.75 * Math.abs(Math.sin(radians));
            const dz = 0.02806854248046875 / 2.0;
            return {
                x: linkPos.x + dx,
                y: linkPos.y + dy,
                z: linkPos.z + dz,
            };
        }
    };

    return LinkPositioningUtils;
};
