import {formatNumber, formatMoney, formatCardPan, formatPhone} from '../dist'

describe('lib', () => {
  it('exposes inner formatters', () => {
    const cases = [formatPhone, formatNumber, formatCardPan, formatMoney]

    cases.forEach(c => {
      expect(c).toEqual(expect.any(Function))
    })
  })
})
