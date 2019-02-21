import * as tslib_1 from "tslib";
import symbols from './symbols';
import formatNumber from '../number';
var DEFAULT_OPTS = {
    currencyCode: '',
    currencySymbol: '',
    digitDelimiter: ' ',
    fractionDelimiter: ',',
    fractionLength: 2,
    strict: true,
    sign: false
};
/**
 * Money formatter.
 * @name formatMoney
 * @type {Function}
 * @example

 formatMoney(12345.6789)   // '12 345,68'
 formatMoney(12300.45, {currencyCode: 'RUB', fractionDelimiter: '.'}) // '12 300.45 ₽'
 formatMoney(123.45, {currencySymbol: 'Foo'}) // '123,45 Foo'

 * @public
 * @param {string} value
 * @param {IFormatMoneyOpts} [opts]
 * @return {string}
 */
export var format = function (value, opts) {
    var _opts = tslib_1.__assign({}, DEFAULT_OPTS, opts);
    var formattedValue = formatNumber(value, _opts);
    var currencySymbol = _opts.currencySymbol, currencyCode = _opts.currencyCode;
    var symbol = getSymbol(currencyCode, currencySymbol);
    return formattedValue + (symbol ? ' ' + symbol : '');
};
export var getSymbol = function (currencyCode, fallback) { return currencyCode && symbols[currencyCode] || fallback; };
export default format;
//# sourceMappingURL=index.js.map