import symbols from './symbols';
import formatNumber from '../number';
const DEFAULT_OPTS = {
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
export const format = (value, opts) => {
    const _opts = Object.assign({}, DEFAULT_OPTS, opts);
    const formattedValue = formatNumber(value, _opts);
    const { currencySymbol, currencyCode } = _opts;
    const symbol = getSymbol(currencyCode, currencySymbol);
    return formattedValue + (symbol ? ' ' + symbol : '');
};
export const getSymbol = (currencyCode, fallback) => currencyCode && symbols[currencyCode] || fallback;
export default format;
//# sourceMappingURL=index.js.map