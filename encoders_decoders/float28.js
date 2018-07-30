module.exports = (() => {
    return {
        encode: (intVal) => {
            const exponent = Math.floor(Math.log2(intVal)) - 7;
            const mantissa = intVal / (Math.pow(2, exponent) * 1.0) - 128;
            return ((exponent + 6) << 23) | (mantissa * Math.pow(2, 16));
        },
        decode: (float28Val) => {
            const exponent = ((float28Val & 0x0F800000) >> 23) - 6;
            const mantissa = (float28Val & 0x007FFFFF) / Math.pow(2, 16) + 128;
            return Math.floor(mantissa * Math.pow(2, exponent));
        }
    };
})();