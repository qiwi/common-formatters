import {formatMoney, MINUS_SIGN} from '../../main/ts'

describe('money', () => {
  it('properly formats input string with default delimiters', () => {
    expect(formatMoney(12345.6789)).toBe('12 345,68')
  })

  it('supports custom delimiters', () => {
    expect(formatMoney(12345.68, {digitDelimiter: ',', fractionDelimiter: '.'})).toEqual('12,345.68')
  })

  it('resolves curr symbol by curr code', () => {
    expect(formatMoney(12300.45, {currencyCode: 'RUB', fractionDelimiter: '.'})).toEqual('12 300.45\u00A0₽')
  })

  it('allows to override currency symbol', () => {
    expect(formatMoney(123.45, {currencySymbol: 'Foo'})).toEqual('123,45\u00A0Foo')
  })

  it('formats integers to money', () => {
    expect(formatMoney(12345)).toBe('12 345,00')
  })

  it('supports sing indication', () => {
    expect(formatMoney(12345, {sign: true})).toBe('+12 345,00')
  })
  it('supports negative', () => {
    expect(formatMoney(-1232245, {sign: true})).toBe(`${MINUS_SIGN}1 232 245,00`)
    expect(formatMoney(-12025)).toBe(`${MINUS_SIGN}12 025,00`)
  })
})
