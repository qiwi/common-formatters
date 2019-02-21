import formatNumber from './number';
const DEFAULT_OPTS = {
    digitDelimiter: ' ',
    fractionDelimiter: ',',
    fractionLength: 2,
    strict: true,
    sign: false,
    multiplier: 100
};
export const format = (value, opts) => {
    const _opts = Object.assign({}, DEFAULT_OPTS, opts);
    const _value = (_opts.multiplier || 1) * +value;
    const formattedValue = formatNumber(_value, _opts);
    return formattedValue + '%';
};
export default format;
//# sourceMappingURL=percent.js.map