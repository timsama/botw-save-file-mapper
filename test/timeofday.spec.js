const assert = require('assert');
const TimeOfDay = require('../encoders_decoders/timeofday.js');

const checkEncode = (value, expectedEncoding) => {
    const actualEncoding = TimeOfDay.encode(value);
    assert(actualEncoding === expectedEncoding, `${value} was expected to have encoding ${expectedEncoding} but instead gave ${actualEncoding}`);
};

const checkDecode = (value, expectedDurationStr) => {
    const actualDurationStr = TimeOfDay.decode(value).toString();
    assert(actualDurationStr === expectedDurationStr, `${value} was expected to be ${expectedDurationStr} but instead was ${actualDurationStr}`);
};

describe('timeofday.js', function(){
    it('should give correct integer values for known times of day', function(){
        checkEncode('09:45 PM', 326);
        checkEncode('09:50 PM', 328);
        checkEncode('09:55 PM', 329);
        checkEncode('10:00 PM', 330);
        checkEncode('10:05 PM', 331);
        checkEncode('10:10 PM', 333);
        checkEncode('10:15 PM', 334);
        checkEncode('10:20 PM', 335);
        checkEncode('10:25 PM', 336);
        checkEncode('10:30 PM', 338);
        checkEncode('10:35 PM', 339);
        checkEncode('10:40 PM', 340);
        checkEncode('10:45 PM', 341);
        checkEncode('10:50 PM', 343);
        checkEncode('10:55 PM', 344);
        checkEncode('11:00 PM', 345);
        checkEncode('11:05 PM', 346);
        checkEncode('11:10 PM', 348);
        checkEncode('11:15 PM', 349);
        checkEncode('11:20 PM', 350);
        checkEncode('11:25 PM', 351);
        checkEncode('11:30 PM', 353);
        checkEncode('11:35 PM', 354);
        checkEncode('11:40 PM', 355);
        checkEncode('11:45 PM', 356);
        checkEncode('11:50 PM', 358);
        checkEncode('11:55 PM', 359);
        checkEncode('12:00 AM', 0);
    });

    it('should give correct times of day for known integer values', function(){
        checkDecode(326, '09:45 PM');
        checkDecode(327, '09:45 PM');
        checkDecode(328, '09:50 PM');
        checkDecode(329, '09:55 PM');
        checkDecode(330, '10:00 PM');
        checkDecode(331, '10:05 PM');
        checkDecode(332, '10:05 PM');
        checkDecode(333, '10:10 PM');
        checkDecode(334, '10:15 PM');
        checkDecode(335, '10:20 PM');
        checkDecode(336, '10:25 PM');
        checkDecode(338, '10:30 PM');
        checkDecode(339, '10:35 PM');
        checkDecode(340, '10:40 PM');
        checkDecode(341, '10:45 PM');
        checkDecode(342, '10:45 PM');
        checkDecode(343, '10:50 PM');
        checkDecode(344, '10:55 PM');
        checkDecode(345, '11:00 PM');
        checkDecode(346, '11:05 PM');
        checkDecode(347, '11:05 PM');
        checkDecode(348, '11:10 PM');
        checkDecode(349, '11:15 PM');
        checkDecode(350, '11:20 PM');
        checkDecode(351, '11:25 PM');
        checkDecode(352, '11:25 PM');
        checkDecode(353, '11:30 PM');
        checkDecode(354, '11:35 PM');
        checkDecode(355, '11:40 PM');
        checkDecode(356, '11:45 PM');
        checkDecode(357, '11:45 PM');
        checkDecode(358, '11:50 PM');
        checkDecode(359, '11:55 PM');
    });
});
