module.exports = (() => {
    return {
        encode: (intVal) => {
            const exponent = Math.floor(Math.log2(intVal)) - 7;
            const mantissa = intVal / Math.pow(2, exponent) - 128;
            return (((exponent + 6) << 7) | mantissa) << 16;
        },
        decode: (float12Val) => {
            const leftTwoBytes = float12Val >> 16;
            const exponent = ((leftTwoBytes & 0x0F80) >> 7) - 6;
            const mantissa = (leftTwoBytes & 0x007F) + 128;
            return Math.floor(mantissa * Math.pow(2, exponent));
        }
    };
})();