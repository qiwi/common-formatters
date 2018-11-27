import {formatPercent, MINUS_SIGN} from '../src'

describe('percent', () => {
  it('properly formats input string with default delimiters', () => {
    expect(formatPercent(0.678901)).toBe('67,89%')
  })

  it('supports custom delimiters', () => {
    expect(formatPercent(123.4568, {digitDelimiter: ',', fractionDelimiter: '.'})).toEqual('12,345.68%')
  })

  it('formats integers', () => {
    expect(formatPercent(12345)).toBe('1 234 500,00%')
  })

  it('supports sing indication', () => {
    expect(formatPercent(12345, {sign: true})).toBe('+1 234 500,00%')
  })

  it('supports fraction length customization', () => {
    expect(formatPercent(-0.123, {fractionLength: 3, sign: true})).toBe(`${MINUS_SIGN}12,300%`)
    expect(formatPercent(0.123456, {fractionLength: 0})).toBe('12%')
  })
})
