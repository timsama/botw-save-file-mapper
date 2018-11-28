module.exports = (() => {
    return {
        encode: (intVal) => {
            const sign = intVal < 0 ? 0x80000000 : 0x00000000;
            const absIntVal = Math.abs(intVal);
            const rawExponent = Math.floor(Math.log2(absIntVal));
            const exponent = Math.floor(Math.log2(absIntVal));
            const mantissa = absIntVal / (Math.pow(2, rawExponent - 7) * 1.0) - 128;
            return ((((exponent + 127) << 23) | (mantissa * Math.pow(2, 16))) | sign) >>> 0;
        },
        decodeAsInt: (float32Val) => {
            const sign = ((float32Val & 0x80000000) >> 31) * 2 + 1;
            const exponent = ((float32Val & 0x7F800000) >> 23) - 134;
            const mantissa = (float32Val & 0x007FFFFF) / Math.pow(2, 16) + 128;
            return sign * Math.floor(mantissa * Math.pow(2, exponent));
        },
        decodeFloat: (float32Val) => {
            const sign = ((float32Val & 0x80000000) >> 31) * 2 + 1;
            const exponent = ((float32Val & 0x7F800000) >> 23) - 134;
            const mantissa = (float32Val & 0x007FFFFF) / Math.pow(2, 16) + 128;
            return sign * mantissa * Math.pow(2, exponent);
        }
    };
})();