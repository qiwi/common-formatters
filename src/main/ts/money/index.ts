/**
 * @module @qiwi/common-formatter
 */

import { IAny, IFormatted, IFormatter } from '../interface'
import { formatNumber } from '../number'
import symbols from './symbols'

/**
 * @interface IFormatMoneyOpts
 * @property {string} digitDelimiter
 * @property {string} fractionDelimiter
 * @property {number} fractionLength
 * @property {string} currencyCode
 * @property {string} currencySymbol
 * @property {boolean} sign forces sign indication
 */
export type IFormatMoneyOpts = {
  strict?: boolean
  digitDelimiter?: string
  fractionDelimiter?: string
  fractionLength?: number
  currencyCode?: string
  currencySymbol?: string
  currencyPosition?: 'left' | 'right'
  currencySpacer?: string
  sign?: boolean
  fractionRemoveZeros?: boolean
}

export const nbsp = '\u00A0'

export const zwsp = '\u200B'

export const FORMAT_MONEY_DEFAULTS: IFormatMoneyOpts = {
  currencyCode: '',
  currencySymbol: '',
  digitDelimiter: ' ',
  fractionDelimiter: ',',
  fractionLength: 2,
  strict: true,
  sign: false,
  fractionRemoveZeros: false,
}

/**
 * Money formatter.
 * @name formatMoney
 * @type {Function}
 * @example
 * formatMoney(12345.6789)   // '12 345,68'
 * formatMoney(12300.45, {currencyCode: 'RUB', fractionDelimiter: '.'}) // '12 300.45 ₽'
 * formatMoney(123.45, {currencySymbol: 'Foo'}) // '123,45 Foo'
 * @public
 * @param {string} value
 * @param {IFormatMoneyOpts} [opts]
 * @return {string}
 */
export const formatMoney: IFormatter = (
  value: IAny,
  opts?: IFormatMoneyOpts,
): IFormatted => {
  const _opts = { ...FORMAT_MONEY_DEFAULTS, ...opts }
  const formattedValue = formatNumber(value, _opts)
  const {
    currencySymbol,
    currencyCode,
    currencyPosition,
    currencySpacer,
  } = _opts
  const symbol = getSymbol(currencyCode, currencySymbol)
  const spacer = currencySpacer || getSpacer(currencyCode)
  const pos = currencyPosition || getPosition(currencyCode)

  if (!symbol) {
    return formattedValue
  }

  return pos === 'right'
    ? `${formattedValue}${spacer}${symbol}`
    : `${symbol}${spacer}${formattedValue}`
}

const getSpacer = (currencyCode?: string): string =>
  currencyCode === 'USD' ? zwsp : nbsp

const getPosition = (currencyCode?: string): 'left' | 'right' =>
  currencyCode === 'USD' ? 'left' : 'right'

const getSymbol = (
  currencyCode?: string,
  fallback?: string,
): string | undefined => (currencyCode && symbols[currencyCode]) || fallback
