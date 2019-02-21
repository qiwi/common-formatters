import { clearNumericValue } from './util';
export var RUSSIAN_MOBILE_PHONE = '+* *** ***-**-**';
var DEFAULT_OPTS = {
    strict: true,
    countryCodePrefix: '+',
    blocksDelimiter: ' ',
    countryCodeLength: 0,
    areaCodeLength: 0,
    areaBrackets: false,
    phoneNumberDelimiter: '-',
    mask: null
};
export var validate = function (value) { return !!value.length; };
/**
 * Phone formatter.
 * Relied on E.164 https://en.wikipedia.org/wiki/E.164
 *
 * @name formatPhone
 * @param {string} value
 * @param {IFormatPhoneOpts} [opts]
 * @return {string}
 * @example

 // Basic cases
 formatPhone('1234567')     // 123-45-67
 formatPhone('12345678')    // 1234-5678
 formatPhone('12345')       // 1-23-45
 formatPhone('1234567890')  // 1234567890

 // Format by mask
 formatPhone('79876543210', {mask: '+* *** ***-**-**'}) // +7 987 654-32-10

 // Format by opts
 formatPhone('223344', {countryCode: '7', areaCode: '8443', areaBrackets: true, phoneNumberDelimiter: '_'}) // +7 (8443) 22_33_44

 */
export var format = function (value, opts) {
    var cleared = clearNumericValue(value);
    var _a = Object.assign({}, DEFAULT_OPTS, opts), strict = _a.strict, areaCode = _a.areaCode, countryCode = _a.countryCode, countryCodeLength = _a.countryCodeLength, areaCodeLength = _a.areaCodeLength, phoneNumberLength = _a.phoneNumberLength, phoneNumberDelimiter = _a.phoneNumberDelimiter, blocksDelimiter = _a.blocksDelimiter, countryCodePrefix = _a.countryCodePrefix, areaBrackets = _a.areaBrackets, mask = _a.mask;
    if (strict && !validate(cleared)) {
        throw new Error('formatPhone: invalid input');
    }
    if (mask) {
        return formatByMask(cleared, mask);
    }
    var _b = parseBlocks(cleared, countryCodeLength, areaCodeLength, phoneNumberLength), rCountry = _b[0], rArea = _b[1], rPhone = _b[2];
    var country = formatCountryCode(rCountry || countryCode, countryCodePrefix);
    var area = formatAreaCode(rArea || areaCode, areaBrackets);
    var phone = formatPhoneNumber(rPhone, phoneNumberDelimiter);
    return [country, area, phone]
        .filter(function (v) { return v !== null; })
        .join(blocksDelimiter);
};
export var parseBlocks = function (value) {
    var blocks = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        blocks[_i - 1] = arguments[_i];
    }
    var lengths = resolveBlockLengths.apply(void 0, [value.length].concat(blocks));
    var pos = 0;
    return lengths.map(function (v) {
        var substr = value.substr(pos, v);
        pos = pos + v;
        return substr;
    });
};
export var resolveBlockLengths = function (entireLength) {
    var blocks = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        blocks[_i - 1] = arguments[_i];
    }
    var known = blocks.filter(function (v) { return v !== undefined; });
    var sum = known.reduce(function (m, v) { return m + v; }, 0);
    var diff = entireLength - sum;
    switch (blocks.length - known.length) {
        case 0:
            if (diff !== 0) {
                throw new Error('formatPhone: invalid opts');
            }
            return known;
        case 1:
            if (diff < 0) {
                throw new Error('formatPhone: invalid opts');
            }
            return blocks.map(function (v) { return v === null || v === undefined ? diff : v; });
        default:
            throw new Error('formatPhone: invalid opts');
    }
};
export var formatAreaCode = function (value, brackets) {
    if (!value || !value.length) {
        return null;
    }
    return brackets
        ? '(' + value + ')'
        : value;
};
export var formatCountryCode = function (value, prefix) {
    if (!value || !value.length) {
        return null;
    }
    return prefix + value;
};
export function formatPhoneNumber(value, delimiter) {
    if (delimiter === void 0) { delimiter = ''; }
    switch (value.length) {
        case 0:
            return null;
        case 5:
        case 6:
        case 7:
            return value.replace(/(.{1,3})(.{2})(.{2})/, '$1' + delimiter + '$2' + delimiter + '$3');
        case 8:
            return value.slice(0, 4) + delimiter + value.slice(4, 8);
        default:
            return value;
    }
}
export function formatByMask(value, mask) {
    var targetLen = mask.replace(/[^*]/g, '').length;
    var values = value.split('');
    if (value.length !== targetLen) {
        throw new Error('formatPhone: input does not matches target mask');
    }
    // TODO optimize performance
    return mask
        .split('')
        .map(function (v) { return v === '*' ? values.shift() : v; })
        .join('');
}
export default format;
//# sourceMappingURL=phone.js.map