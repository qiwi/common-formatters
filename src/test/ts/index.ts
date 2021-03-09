import {
  FORMAT_CARDPAN_DEFAULTS,
  FORMAT_MONEY_DEFAULTS,
  FORMAT_NUMBER_DEFAULTS,
  FORMAT_PERCENT_DEFAULTS,
  FORMAT_PHONE_DEFAULTS,
  formatCardPan,
  formatMoney,
  formatNumber,
  formatPercent,
  formatPhone,
  validateCardPan,
  validateNumber,
  validatePhone,
} from '../../main/ts'

describe('lib', () => {
  it('exposes inner formatters', () => {
    const cases = [
      formatPhone,
      formatNumber,
      formatCardPan,
      formatMoney,
      formatPercent,
    ]

    cases.forEach((c) => expect(c).toEqual(expect.any(Function)))
  })

  it('exposes inner validators', () => {
    const cases = [validateCardPan, validateNumber, validatePhone]

    cases.forEach((c) => expect(c).toEqual(expect.any(Function)))
  })

  it('exposes inner default opts', () => {
    const cases = [
      FORMAT_PHONE_DEFAULTS,
      FORMAT_NUMBER_DEFAULTS,
      FORMAT_MONEY_DEFAULTS,
      FORMAT_CARDPAN_DEFAULTS,
      FORMAT_PERCENT_DEFAULTS,
    ]

    cases.forEach((c) => expect(c).toEqual(expect.any(Object)))
  })
})
