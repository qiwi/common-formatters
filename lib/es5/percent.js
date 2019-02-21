import * as tslib_1 from "tslib";
import formatNumber from './number';
var DEFAULT_OPTS = {
    digitDelimiter: ' ',
    fractionDelimiter: ',',
    fractionLength: 2,
    strict: true,
    sign: false,
    multiplier: 100
};
export var format = function (value, opts) {
    var _opts = tslib_1.__assign({}, DEFAULT_OPTS, opts);
    var _value = (_opts.multiplier || 1) * +value;
    var formattedValue = formatNumber(_value, _opts);
    return formattedValue + '%';
};
export default format;
//# sourceMappingURL=percent.js.map