/**
 * @module @qiwi/common-formatter
 */

import {
  IAny,
  IFormatted,
  IFormatter,
  IValidator,
} from './interface'
import {isNumericString} from './util'

/**
 * @interface IFormatNumberOpts
 * @property {string} digitDelimiter
 * @property {string} fractionDelimiter
 * @property {number} fractionLength
 * @property {boolean} sign forces sign indication
 */
export type IFormatNumberOpts = {
  digitDelimiter?: string;
  fractionDelimiter?: string;
  fractionLength?: number;
  strict?: boolean;
  sign?: boolean;
}

export const FORMAT_NUMBER_DEFAULTS: IFormatNumberOpts = {
  digitDelimiter: ' ',
  fractionDelimiter: ',',
  strict: true,
  sign: false,
}

export const validateNumber: IValidator = (value: IAny) => !isNaN(value)

export const MINUS_SIGN: string = '−'
export const PLUS_SIGN: string = '+'

/**
 * Number formatter.
 * @module @qiwi/common-formatters
 * @name formatNumber
 * @type {Function}
 * @public
 * @param {string} value
 * @param {IFormatNumberOpts} [opts]
 * @return {string}
 * @example
 * formatNumber(12345.6789)  //  '12 345,6789'
 * formatNumber(12345.6789, {digitDelimiter: ',', fractionDelimiter: '.'}) // '12,345.6789'
 */
export const formatNumber: IFormatter = (value: IAny, opts?: IFormatNumberOpts): IFormatted => {
  const {fractionDelimiter, fractionLength, digitDelimiter, strict, sign} = {...FORMAT_NUMBER_DEFAULTS, ...opts}

  if (strict && !validateNumber(value)) {
    throw new Error('formatNumber: invalid input')
  }

  const num = +value

  const fl = fractionLength === undefined
    ? isNumericString(value)
      ? Math.max(value.length - (num | 0).toString().length - 1, 0)
      : undefined
    : fractionLength

  const _value = fl === undefined
    ? Math.abs(num).toString()
    : Math.abs(num).toFixed(fl)

  const signPrefix = num < 0
    ? MINUS_SIGN
    : sign && num > 0
      ? PLUS_SIGN
      : ''

  return signPrefix + _value
    .split('.')
    .map((v, i) => i === 0
      ? v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + digitDelimiter)
      : v,
    )
    .join(fractionDelimiter)
}
