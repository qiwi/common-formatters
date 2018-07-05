// @flow

import type {
  IAny,
  IFormatted,
  IFormatter,
  IValidator
} from './interface'
import {isNumericString} from './util'

/**
 * @interface IFormatNumberOpts
 * @package interface
 * @property {string} digitDelimiter
 * @property {string} fractionDelimiter
 */
export type IFormatNumberOpts = {
  digitDelimiter: string;
  fractionDelimiter: string;
  strict: boolean;
}

const DEFAULT_OPTS: IFormatNumberOpts = {
  digitDelimiter: ' ',
  fractionDelimiter: ',',
  strict: true
}

export const validate: IValidator = (value: IAny) => !isNaN(value)

/**
 * Number formatter.
 * @name formatNumber
 * @type {Function}
 * @public
 * @param {string} value
 * @param {IFormatNumberOpts} [opts]
 * @return {string}
 * @example

 formatNumber(12345.6789)  //  '12 345,6789'
 formatNumber(12345.6789, {digitDelimiter: ',', fractionDelimiter: '.'}) // '12,345.6789'

 */
export const format: IFormatter = (value: IAny, opts?: ?IFormatNumberOpts): IFormatted => {
  const {fractionDelimiter, digitDelimiter, strict} = Object.assign({}, DEFAULT_OPTS, opts)

  if (strict && !validate(value)) {
    throw new Error('formatNumber: invalid input')
  }

  const _value = isNumericString(value)
    ? (+value).toFixed(Math.max(value.length - (+value|0).toString().length - 1, 0))
    : (+value).toString()

  return _value
    .split('.')
    .map((v, i) => i === 0
      ? v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + digitDelimiter)
      : v
    )
    .join(fractionDelimiter)

}

export default format
