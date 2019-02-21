// @flow

import formatNumber from './number'
import type {
  IAny,
  IFormatted,
  IFormatter
} from './interface'

/**
 * @interface IFormatPercentOpts
 * @property {string} digitDelimiter
 * @property {string} fractionDelimiter
 * @property {number} fractionLength
 * @property {number} multiplier
 * @property {boolean} sign forces sign indication
 */
export type IFormatPercentOpts = {
  strict: boolean;
  digitDelimiter: string;
  fractionDelimiter: string;
  fractionLength: number;
  multiplier: number;
  sign: boolean;
}

const DEFAULT_OPTS: IFormatPercentOpts = {
  digitDelimiter: ' ',
  fractionDelimiter: ',',
  fractionLength: 2,
  strict: true,
  sign: false,
  multiplier: 100
}

export const format: IFormatter = (value: IAny, opts?: ?IFormatPercentOpts): IFormatted => {
  const _opts = {...DEFAULT_OPTS, ...opts}
  const _value = _opts.multiplier * +value
  const formattedValue = formatNumber(_value, _opts)

  return formattedValue + '%'
}

export default format
