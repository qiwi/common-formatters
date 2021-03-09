import { formatCardPan } from '../../main/ts'

describe('cardpan', () => {
  it('asserts input to be card number', () => {
    expect(() => formatCardPan('foo bar')).toThrow(
      'formatCardPan: invalid input',
    )
    expect(() => formatCardPan(null)).toThrow('formatCardPan: invalid input')
    expect(() => formatCardPan('12345678123456789012')).toThrow(
      'formatCardPan: invalid input',
    )
  })

  it('properly formats American Express', () => {
    expect(formatCardPan('375987654321001')).toEqual('3759 876543 21001')
  })

  it('properly formats Visa/MC with custom delimiters', () => {
    expect(formatCardPan('1234567812345678', { digitDelimiter: '-' })).toEqual(
      '1234-5678-1234-5678',
    )
    expect(
      formatCardPan('1234567812345678901', { digitDelimiter: '  ' }),
    ).toEqual('1234  5678  1234  5678901')
  })
})
