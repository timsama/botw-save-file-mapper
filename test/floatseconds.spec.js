const assert = require('assert');
const FloatSeconds = require('../encoders_decoders/floatseconds.js');

const checkEncoding = (value, expectedEncoding) => {
    const actualEncoding = FloatSeconds.encode(value);
    assert(actualEncoding === expectedEncoding, `${value} was expected to have encoding 0x${expectedEncoding.toString(16)} but instead gave 0x${actualEncoding.toString(16)}`);
};

const checkDuration = (value, expectedDurationStr) => {
    const actualDurationStr = FloatSeconds.decode(value).toString();
    assert(actualDurationStr === expectedDurationStr, `0x${value.toString(16)} was expected to have duration ${expectedDurationStr} but instead gave ${actualDurationStr}`);
};

describe('floatseconds.js', function(){
    it('should give correct hex values for known durations', function(){
        checkEncoding('00:02', 0x40000000);
        checkEncoding('00:03', 0x40400000);
        checkEncoding('00:04', 0x40800000);
        checkEncoding('00:05', 0x40A00000);
        checkEncoding('00:06', 0x40C00000);
        checkEncoding('00:07', 0x40E00000);
        checkEncoding('00:08', 0x41000000);
        checkEncoding('00:09', 0x41100000);
        checkEncoding('00:10', 0x41200000);
        checkEncoding('00:15', 0x41700000);
        checkEncoding('00:16', 0x41800000);
        checkEncoding('00:17', 0x41880000);
        checkEncoding('00:18', 0x41900000);
        checkEncoding('00:30', 0x41F00000);
        checkEncoding('00:31', 0x41F80000);
        checkEncoding('00:32', 0x42000000);
        checkEncoding('00:33', 0x42040000);
        checkEncoding('00:36', 0x42100000);
        checkEncoding('00:37', 0x42140000);
        checkEncoding('00:38', 0x42180000);
        checkEncoding('00:42', 0x42280000);
        checkEncoding('02:08', 0x43000000);
        checkEncoding('03:30', 0x43520000);
        checkEncoding('03:31', 0x43530000);
        checkEncoding('03:32', 0x43540000);
        checkEncoding('03:33', 0x43550000);
        checkEncoding('03:49', 0x43650000);
        checkEncoding('04:00', 0x43700000);
        checkEncoding('04:16', 0x43800000);
        checkEncoding('04:18', 0x43810000);
        checkEncoding('04:50', 0x43910000);
        checkEncoding('08:32', 0x44000000);
        checkEncoding('09:36', 0x44100000);
        checkEncoding('10:40', 0x44200000);
        checkEncoding('16:00', 0x44700000);
        checkEncoding('16:04', 0x44710000);
        checkEncoding('17:04', 0x44800000);
        checkEncoding('17:12', 0x44810000);
        checkEncoding('19:12', 0x44900000);
        checkEncoding('22:24', 0x44a80000);
        checkEncoding('22:24', 0x44a80000);
        checkEncoding('24:32', 0x44b80000);
        checkEncoding('24:40', 0x44b90000);
        checkEncoding('24:48', 0x44ba0000);
        checkEncoding('30:00', 0x44e10000);
    });

    it('should give correct durations for known values', function(){
        checkDuration(0x40000000, '00:02');
        checkDuration(0x40100000, '00:02');
        checkDuration(0x40200000, '00:02');
        checkDuration(0x40300000, '00:02');
        checkDuration(0x40400000, '00:03');
        checkDuration(0x40500000, '00:03');
        checkDuration(0x40600000, '00:03');
        checkDuration(0x40700000, '00:03');
        checkDuration(0x40800000, '00:04');
        checkDuration(0x40900000, '00:04');
        checkDuration(0x40A00000, '00:05');
        checkDuration(0x40B00000, '00:05');
        checkDuration(0x40D00000, '00:06');
        checkDuration(0x40F00000, '00:07');
        checkDuration(0x41000000, '00:08');
        checkDuration(0x41010000, '00:08');
        checkDuration(0x41100000, '00:09');
        checkDuration(0x41200000, '00:10');
        checkDuration(0x412F0000, '00:10');
        checkDuration(0x41700000, '00:15');
        checkDuration(0x41800000, '00:16');
        checkDuration(0x41810000, '00:16');
        checkDuration(0x41870000, '00:16');
        checkDuration(0x41880000, '00:17');
        checkDuration(0x41900000, '00:18');
        checkDuration(0x41F00000, '00:30');
        checkDuration(0x41F70000, '00:30');
        checkDuration(0x41F80000, '00:31');
        checkDuration(0x41FF0000, '00:31');
        checkDuration(0x42000000, '00:32');
        checkDuration(0x42040000, '00:33');
        checkDuration(0x42100000, '00:36');
        checkDuration(0x42110000, '00:36');
        checkDuration(0x42120000, '00:36');
        checkDuration(0x42140000, '00:37');
        checkDuration(0x42180000, '00:38');
        checkDuration(0x42280000, '00:42');
        checkDuration(0x43000000, '02:08');
        checkDuration(0x43520000, '03:30');
        checkDuration(0x43530000, '03:31');
        checkDuration(0x43540000, '03:32');
        checkDuration(0x43550000, '03:33');
        checkDuration(0x43650000, '03:49');
        checkDuration(0x43700000, '04:00');
        checkDuration(0x43800000, '04:16');
        checkDuration(0x43810000, '04:18');
        checkDuration(0x43910000, '04:50');
        checkDuration(0x44000000, '08:32');
        checkDuration(0x44100000, '09:36');
        checkDuration(0x44200000, '10:40');
        checkDuration(0x44700000, '16:00');
        checkDuration(0x44710000, '16:04');
        checkDuration(0x44800000, '17:04');
        checkDuration(0x44810000, '17:12');
        checkDuration(0x44900000, '19:12');
        checkDuration(0x44a80000, '22:24');
        checkDuration(0x44a80000, '22:24');
        checkDuration(0x44b80000, '24:32');
        checkDuration(0x44b90000, '24:40');
        checkDuration(0x44ba0000, '24:48');
        checkDuration(0x44e10000, '30:00');
    });
});
