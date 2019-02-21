// @flow
export function clearNumericValue(value) {
    return ('' + value).replace(/[^*\d]/g, '');
}
export function isNumericString(value) {
    return typeof value === 'string' && !isNaN(+value);
}
//# sourceMappingURL=util.js.map