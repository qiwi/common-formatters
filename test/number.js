import {formatNumber} from '../src'

describe('number', () => {
  it('properly formats input string with default delimiters', () => {
    expect(formatNumber(12345.6789)).toBe('12 345,6789')
  })

  it('supports custom delimiters', () => {
    expect(formatNumber(12345.6789, {digitDelimiter: ',', fractionDelimiter: '.'})).toEqual('12,345.6789')
  })

  it('asserts input in strict mode', () => {
    expect(() => formatNumber('foo')).toThrow('formatNumber: invalid input')
  })
})
