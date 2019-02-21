import {formatNumber, formatMoney, formatCardPan, formatPhone, formatPercent} from '../main'

describe('lib', () => {
  it('exposes inner formatters', () => {
    const cases = [formatPhone, formatNumber, formatCardPan, formatMoney, formatPercent]

    cases.forEach(c => {
      expect(c).toEqual(expect.any(Function))
    })
  })
})
