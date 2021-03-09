/**
 * @module @qiwi/common-formatter
 */

import {
  IAny,
  IFormatted,
  IFormatter,
  IValidator,
} from './interface'
import {clearNumericValue} from './util'

export const RUSSIAN_MOBILE_PHONE = '+* *** ***-**-**'

/**
 * Phone formatter.
 * @interface IFormatPhoneOpts
 * @property {string} blocksDelimiter
 * @property {string} countryCode
 * @property {string} areaCode
 * @property {boolean} areaBrackets
 * @property {string} countryCodePrefix
 * @property {number} countryCodeLength
 * @property {number} areaCodeLength
 * @property {number} phoneNumberLength
 * @property {string} phoneNumberDelimiter
 * @property {string} mask
 */
export type IFormatPhoneOpts = {
  strict?: boolean;
  blocksDelimiter?: string;
  countryCode?: string;
  areaCode?: string;
  areaBrackets?: boolean;
  countryCodePrefix?: string;
  countryCodeLength?: number;
  areaCodeLength?: number;
  phoneNumberLength?: number;
  phoneNumberDelimiter?: string;
  mask?: string | null
}

export const FORMAT_PHONE_DEFAULTS: IFormatPhoneOpts = {
  strict: true,
  countryCodePrefix: '+',
  blocksDelimiter: ' ',
  countryCodeLength: 0,
  areaCodeLength: 0,
  areaBrackets: false,
  phoneNumberDelimiter: '-',
  mask: null,
}

export const validatePhone: IValidator = (value: IAny) => value.length > 0

/**
 * Phone formatter.
 * Relied on E.164 https://en.wikipedia.org/wiki/E.164
 *
 * @name formatPhone
 * @param {string} value
 * @param {IFormatPhoneOpts} [opts]
 * @return {string}
 * @example
 * // Basic cases
 * formatPhone('1234567')     // 123-45-67
 * formatPhone('12345678')    // 1234-5678
 * formatPhone('12345')       // 1-23-45
 * formatPhone('1234567890')  // 1234567890
 *
 * // Format by mask
 * formatPhone('79876543210', {mask: '+* *** ***-**-**'}) // +7 987 654-32-10
 *
 * // Format by opts
 * formatPhone('223344', {countryCode: '7', areaCode: '8443', areaBrackets: true, phoneNumberDelimiter: '_'}) // +7 (8443) 22_33_44
 */
export const formatPhone: IFormatter = (value: IAny, opts?: IFormatPhoneOpts): IFormatted => {
  const cleared = clearNumericValue(value)
  const {
    strict,
    areaCode,
    countryCode,
    countryCodeLength,
    areaCodeLength,
    phoneNumberLength,
    phoneNumberDelimiter,
    blocksDelimiter,
    countryCodePrefix,
    areaBrackets,
    mask,
  } = {...FORMAT_PHONE_DEFAULTS, ...opts}

  if (strict && !validatePhone(cleared)) {
    throw new Error('formatPhone: invalid input')
  }

  if (mask) {
    return formatByMask(cleared, mask)
  }

  const [rCountry, rArea, rPhone] = parseBlocks(cleared, countryCodeLength, areaCodeLength, phoneNumberLength)

  const country = formatCountryCode(rCountry || countryCode, countryCodePrefix)
  const area = formatAreaCode(rArea || areaCode, areaBrackets)
  const phone = formatPhoneNumber(rPhone, phoneNumberDelimiter)

  return [country, area, phone]
    .filter(v => v !== null)
    .join(blocksDelimiter)
}

export const parseBlocks = (value: string, ...blocks: Array<number | undefined>): Array<string> => {
  const lengths = resolveBlockLengths(value.length, ...blocks)
  let pos = 0

  return lengths.map((v: number) => {
    const substr = value.substr(pos, v)
    pos = pos + v
    return substr
  })
}

export const resolveBlockLengths = (entireLength: number, ...blocks: Array<number | undefined>): Array<number> => {
  const known = blocks.filter(v => v !== undefined) as Array<number>
  const sum: number = known.reduce((m, v) => m + v, 0)
  const diff = entireLength - sum

  switch (blocks.length - known.length) {
    case 0:
      if (diff !== 0) {
        throw new Error('formatPhone: invalid opts')
      }

      return known

    case 1:
      if (diff < 0) {
        throw new Error('formatPhone: invalid opts')
      }
      return blocks.map(v => v === null || v === undefined ? diff : v)

    default:
      throw new Error('formatPhone: invalid opts')
  }
}

export const formatAreaCode = (value?: string, brackets?: boolean): string | null => {
  if (!value || value.length === 0) {
    return null
  }

  return brackets
    ? '(' + value + ')'
    : value
}

export const formatCountryCode = (value?: string, prefix?: string): string | null => {
  if (!value || value.length === 0) {
    return null
  }

  return prefix + value
}

export function formatPhoneNumber(value: string, delimiter = ''): string | null {
  switch (value.length) {
    case 0:
      return null

    case 5:
    case 6:
    case 7:
      return value.replace(/(.{1,3})(.{2})(.{2})/, '$1' + delimiter + '$2' + delimiter + '$3')

    case 8:
      return value.slice(0, 4) + delimiter + value.slice(4, 8)

    default:
      return value
  }
}

export function formatByMask(value: string, mask: string): string {
  const targetLen = mask.replace(/[^*]/g, '').length
  const values = value.split('')

  if (value.length !== targetLen) {
    throw new Error('formatPhone: input does not matches target mask')
  }

  // TODO optimize performance
  return mask
    .split('')
    .map(v => v === '*' ? values.shift() : v)
    .join('')
}
