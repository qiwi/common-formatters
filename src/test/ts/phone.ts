import {formatPhone} from '../../main/ts'
import {
  formatAreaCode,
  formatByMask,
  formatCountryCode,
  formatPhoneNumber,
  parseBlocks,
  resolveBlockLengths,
} from '../../main/ts/phone'

describe('formatPhone', () => {
  it('throws error if input is empty', () => {
    expect(() => formatPhone('foo')).toThrow('formatPhone: invalid input')
  })

  it('prefers mask-based flow', () => {
    expect(formatPhone('1234', {mask: '** **'})).toEqual('12 34')
  })

  it('allows optional country and area codes', () => {
    expect(formatPhone('1234', {countryCode: '1', areaCode: '555'})).toEqual('+1 555 1234')
  })

  it('parsed blocks has priority', () => {
    expect(formatPhone('1234', {countryCodeLength: 1, countryCode: '2', areaCodeLength: 1})).toEqual('+1 2 34')
  })
})

describe('inner', () => {
  describe('mask', () => {
    it('formats phone by specified mask', () => {
      expect(formatByMask('12345678', '** **-**    **')).toEqual('12 34-56    78')
    })

    it('throws error on length mismatch', () => {
      expect(() => formatByMask('123', '*** **')).toThrow('formatPhone: input does not matches target mask')
    })
  })

  describe('block formatter', () => {
    describe('country', () => {
      it('appends prefix to value', () => {
        expect(formatCountryCode('7', '+')).toBe('+7')
      })

      it('returns null if value is empty', () => {
        expect(formatCountryCode('', '+')).toBeNull()
      })
    })

    describe('area', () => {
      it('returns null if value is empty', () => {
        expect(formatAreaCode('')).toBeNull()
      })

      it('appends brackets if is needed', () => {
        expect(formatAreaCode('495', true)).toBe('(495)')
      })

      it('otherwise returns value as is', () => {
        expect(formatAreaCode('495')).toBe('495')
      })
    })

    describe('number', () => {
      it('returns null if value is empty', () => {
        expect(formatPhoneNumber('')).toBeNull()
      })

      it('formats 8 digits', () => {
        expect(formatPhoneNumber('12345678', '-')).toBe('1234-5678')
      })

      it('formats 5,6,7 digits', () => {
        expect(formatPhoneNumber('12345', '-')).toBe('1-23-45')
        expect(formatPhoneNumber('123456', '-')).toBe('12-34-56')
        expect(formatPhoneNumber('1234567', '-')).toBe('123-45-67')
      })

      it('otherwise returns value as is', () => {
        expect(formatPhoneNumber('1234567890', '-')).toBe('1234567890')
      })
    })
  })

  describe('resolveBlockLengths', () => {
    it('verifies length consistence', () => {
      expect(() => resolveBlockLengths(1, 2, 3, 4)).toThrow()
    })

    describe('handles undefined', () => {
      it('asserts consistency', () => {
        expect(() => resolveBlockLengths(1, 2, undefined, 4)).toThrow()
      })

      it('checks sufficiency', () => {
        expect(() => resolveBlockLengths(1, undefined, undefined, 4)).toThrow()
      })

      it('calculates diff', () => {
        expect(resolveBlockLengths(4, 1, undefined, 1)).toEqual([1, 2, 1])
      })
    })

    it('returns coherent blocks as is', () => {
      expect(resolveBlockLengths(3, 2, 1, 0)).toEqual([2, 1, 0])
    })
  })

  describe('parseBlocks', () => {
    it('cuts input string on parts', () => {
      expect(parseBlocks('abcdef', 1, 2, 3)).toEqual(['a', 'bc', 'def'])
    })
  })
})
