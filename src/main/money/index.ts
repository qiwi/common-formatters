/**
 * @module @qiwi/common-formatter
 */

import symbols from './symbols'
import formatNumber from '../number'
import {
  IAny,
  IFormatted,
  IFormatter
} from '../interface'

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
  strict?: boolean;
  digitDelimiter?: string;
  fractionDelimiter?: string;
  fractionLength?: number;
  currencyCode?: string;
  currencySymbol?: string;
  sign?: boolean;
}

export const FORMAT_MONEY_DEFAULTS: IFormatMoneyOpts = {
  currencyCode: '',
  currencySymbol: '',
  digitDelimiter: ' ',
  fractionDelimiter: ',',
  fractionLength: 2,
  strict: true,
  sign: false
}

/**
 * Money formatter.
 * @name formatMoney
 * @type {Function}
 * @example

 formatMoney(12345.6789)   // '12 345,68'
 formatMoney(12300.45, {currencyCode: 'RUB', fractionDelimiter: '.'}) // '12 300.45 ₽'
 formatMoney(123.45, {currencySymbol: 'Foo'}) // '123,45 Foo'

 * @public
 * @param {string} value
 * @param {IFormatMoneyOpts} [opts]
 * @return {string}
 */
export const formatMoney: IFormatter = (value: IAny, opts?: IFormatMoneyOpts): IFormatted => {
  const _opts = {...FORMAT_MONEY_DEFAULTS, ...opts}
  const formattedValue = formatNumber(value, _opts)
  const {currencySymbol, currencyCode} = _opts
  const symbol = getSymbol(currencyCode, currencySymbol)

  return formattedValue + (symbol ? ' ' + symbol: '')
}

export const getSymbol = (currencyCode?: string, fallback?: string): string | undefined => currencyCode && symbols[currencyCode] || fallback

export default formatMoney
