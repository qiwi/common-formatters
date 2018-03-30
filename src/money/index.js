// @flow

import symbols from './symbols'
import formatNumber from '../number'
import type {
  IAny,
  IFormatted,
  IFormatter
} from '../interface'

/**
 * @interface IFormatMoneyOpts
 * @property {string} digitDelimiter
 * @property {string} fractionDelimiter
 * @property {string} currencyCode
 * @property {string} currencySymbol
 */
export type IFormatMoneyOpts = {
  strict: boolean;
  digitDelimiter: string;
  fractionDelimiter: string;
  currencyCode: string;
  currencySymbol: string;
}

const DEFAULT_OPTS: IFormatMoneyOpts = {
  currencyCode: '',
  currencySymbol: '',
  digitDelimiter: ' ',
  fractionDelimiter: ',',
  strict: true
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
export const format: IFormatter = (value: IAny, opts?: ?IFormatMoneyOpts): IFormatted => {
  const formattedValue = formatNumber((+value).toFixed(2), opts)
  const {currencySymbol, currencyCode} = Object.assign({}, DEFAULT_OPTS, opts)
  const symbol = getSymbol(currencyCode, currencySymbol)

  return formattedValue + (symbol ? ' ' + symbol: '')
}

export const getSymbol = (currencyCode: string, fallback?: ?string): ?string => symbols[currencyCode] || fallback

export default format
