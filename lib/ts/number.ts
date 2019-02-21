import {
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

const DEFAULT_OPTS: IFormatNumberOpts = {
  digitDelimiter: ' ',
  fractionDelimiter: ',',
  strict: true,
  sign: false
}

export const validate: IValidator = (value: IAny) => !isNaN(value)

export const MINUS_SIGN: string = '−'
export const PLUS_SIGN: string = '+'

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
export const format: IFormatter = (value: IAny, opts?: IFormatNumberOpts): IFormatted => {
  const {fractionDelimiter, fractionLength, digitDelimiter, strict, sign} = {...DEFAULT_OPTS, ...opts}

  if (strict && !validate(value)) {
    throw new Error('formatNumber: invalid input')
  }

  const num = +value

  const fl = fractionLength === undefined
    ? isNumericString(value)
      ? Math.max(value.length - (num|0).toString().length - 1, 0)
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
      : v
    )
    .join(fractionDelimiter)
}

export default format
