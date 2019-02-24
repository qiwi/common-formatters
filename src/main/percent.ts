/**
 * @module @qiwi/common-formatter
 */

import { formatNumber } from './number'
import {
  IAny,
  IFormatted,
  IFormatter
} from './interface'

/**
 * Percent value formatter.
 * @interface IFormatPercentOpts
 * @property {string} digitDelimiter
 * @property {string} fractionDelimiter
 * @property {number} fractionLength
 * @property {number} multiplier
 * @property {boolean} sign forces sign indication
 */
export type IFormatPercentOpts = {
  strict?: boolean;
  digitDelimiter?: string;
  fractionDelimiter?: string;
  fractionLength?: number;
  multiplier?: number;
  sign?: boolean;
}

export const FORMAT_PERCENT_DEFAULTS: IFormatPercentOpts = {
  digitDelimiter: ' ',
  fractionDelimiter: ',',
  fractionLength: 2,
  strict: true,
  sign: false,
  multiplier: 100
}

export const formatPercent: IFormatter = (value: IAny, opts?: IFormatPercentOpts): IFormatted => {
  const _opts = {...FORMAT_PERCENT_DEFAULTS, ...opts}
  const _value = (_opts.multiplier || 1) * +value
  const formattedValue = formatNumber(_value, _opts)

  return formattedValue + '%'
}
