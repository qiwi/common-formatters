// @flow

import type {
  IAny,
  IFormatted,
  IFormatter,
  IValidator
} from './interface'

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

  return (+value)
    .toString()
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1' + digitDelimiter)
    .replace('.', fractionDelimiter)
}

export default format
