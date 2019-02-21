var DEFAULT_OPTS = {
    strict: true,
    maskSymbol: '*',
    digitDelimiter: ' '
};
/**
 * @name formatCardPan
 * @type {Function}
 * @param {string} value
 * @param {Object} [opts]
 * @returns {string}
 * @example

 formatCardPan('1234567812345678', {digitDelimiter: '-'}) // '1234-5678-1234-5678'

 */
export var format = function (value, opts) {
    // NOTE pan may be masked
    var cleared = ('' + value).replace(/[^*\d]/g, '');
    var _a = Object.assign({}, DEFAULT_OPTS, opts), strict = _a.strict, dl = _a.digitDelimiter;
    if (strict && !validate(value)) {
        throw new Error('formatCardPan: invalid input');
    }
    var len = cleared.length;
    // American Express
    if (len === 15) {
        return cleared.replace(/^(.{4})(.{6})(.{5})$/, '$1' + dl + '$2' + dl + '$3');
    }
    // Visa, MasterCard, CUP, etc
    return cleared.replace(/(.{4})(?=(.){4,})/g, '$1' + dl);
};
export var validate = function (value) {
    if (typeof value !== 'string') {
        return false;
    }
    return value.length > 14 && value.length < 20;
};
export default format;
//# sourceMappingURL=cardpan.js.map