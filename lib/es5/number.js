import * as tslib_1 from "tslib";
import { isNumericString } from './util';
var DEFAULT_OPTS = {
    digitDelimiter: ' ',
    fractionDelimiter: ',',
    strict: true,
    sign: false
};
export var validate = function (value) { return !isNaN(value); };
export var MINUS_SIGN = '−';
export var PLUS_SIGN = '+';
/**
 * Number formatter.
 * @name formatNumber
 * @type {Function}
 * @public
 * @param {string} value
 * @param {IFormatNumberOpts} [opts]
 * @return {string}
 * @example

 formatNumber(12345.6789)  //  '12 345,6789'
 formatNumber(12345.6789, {digitDelimiter: ',', fractionDelimiter: '.'}) // '12,345.6789'

 */
export var format = function (value, opts) {
    var _a = tslib_1.__assign({}, DEFAULT_OPTS, opts), fractionDelimiter = _a.fractionDelimiter, fractionLength = _a.fractionLength, digitDelimiter = _a.digitDelimiter, strict = _a.strict, sign = _a.sign;
    if (strict && !validate(value)) {
        throw new Error('formatNumber: invalid input');
    }
    var num = +value;
    var fl = fractionLength === undefined
        ? isNumericString(value)
            ? Math.max(value.length - (num | 0).toString().length - 1, 0)
            : undefined
        : fractionLength;
    var _value = fl === undefined
        ? Math.abs(num).toString()
        : Math.abs(num).toFixed(fl);
    var signPrefix = num < 0
        ? MINUS_SIGN
        : sign && num > 0
            ? PLUS_SIGN
            : '';
    return signPrefix + _value
        .split('.')
        .map(function (v, i) { return i === 0
        ? v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + digitDelimiter)
        : v; })
        .join(fractionDelimiter);
};
export default format;
//# sourceMappingURL=number.js.map