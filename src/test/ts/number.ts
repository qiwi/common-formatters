import {formatNumber, MINUS_SIGN} from '../../main/ts'

describe('number', () => {
  it('properly formats input string with default delimiters', () => {
    expect(formatNumber(1234567.8901)).toBe('1 234 567,8901')
  })

  it('supports custom delimiters', () => {
    expect(formatNumber(12345.6789, {digitDelimiter: ',', fractionDelimiter: '.'})).toEqual('12,345.6789')
  })

  it('asserts input in strict mode', () => {
    expect(() => formatNumber('foo')).toThrow('formatNumber: invalid input')
  })

  it('formatter passes pre-formatted fraction as is', () => {
    expect(formatNumber('12345.10000')).toBe('12 345,10000')
  })

  it('properly formats integers', () => {
    expect(formatNumber(12345678)).toBe('12 345 678')
  })

  it('converts falsy types to 0', () => {
    const cases = [false, null, '']

    cases.forEach(v => {
      expect(formatNumber(v)).toBe('0')
    })
  })

  it('supports negatives', () => {
    expect(formatNumber(-10000)).toBe(`${MINUS_SIGN}10 000`)
    expect(formatNumber('-10000')).toBe(`${MINUS_SIGN}10 000`)
  })

  it('supports forced sign indication', () => {
    expect(formatNumber(12345, {sign: true})).toBe('+12 345')
  })

  it('supports fraction length declaration', () => {
    expect(formatNumber(12345.12345, {fractionLength: 2})).toBe('12 345,12')
    expect(formatNumber('12345.12345', {fractionLength: 10})).toBe('12 345,1234500000')
  })
})
