// @flow

import type {
  IAny,
  IFormatted,
  IFormatter,
  IValidator
} from './interface'

/**
 * @interface IFormatCardPanOpts
 * @property {string} digitDelimiter
 * @property {string} maskSymbol
 */
export type IFormatCardPanOpts = {
  strict: boolean;
  maskSymbol: string;
  digitDelimiter: string;
}

const DEFAULT_OPTS: IFormatCardPanOpts = {
  strict: true,
  maskSymbol: '*',
  digitDelimiter: ' '
}

/**
 * @name formatCardPan
 * @type {Function}
 * @param {string} value
 * @param {Object} [opts]
 * @returns {string}
 * @example

 formatCardPan('1234567812345678', {digitDelimiter: '-'}) // '1234-5678-1234-5678'

 */
export const format: IFormatter = (value: IAny, opts?: ?IFormatCardPanOpts): IFormatted => {
  // NOTE pan may be masked
  const cleared = ('' + value).replace(/[^*\d]/g, '')
  const {strict, digitDelimiter: dl} = Object.assign({}, DEFAULT_OPTS, opts)

  if (strict && !validate(value)) {
    throw new Error('formatCardPan: invalid input')
  }
  const len = cleared.length

  // American Express
  if (len === 15) {
    return cleared.replace(/^(.{4})(.{6})(.{5})$/, '$1' + dl + '$2' + dl + '$3')
  }

  // Visa, MasterCard, CUP, etc
  return cleared.replace(/(.{4})(?=(.){4,})/g, '$1' + dl)
}

export const validate: IValidator = (value: IAny, opts?: ?IFormatCardPanOpts): boolean => {
  if (typeof value !== 'string') {
    return false
  }

  return value.length > 14 && value.length < 20
}

export default format
