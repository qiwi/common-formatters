// @flow

import symbols from './symbols'
import formatNumber from '../number'
import type {
  IAny,
  IFormatted,
  IFormatter
} from '../interface'

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

export const format: IFormatter = (value: IAny, opts?: ?IFormatMoneyOpts): IFormatted => {
  const formattedValue = formatNumber((+value).toFixed(2), opts)
  const {currencySymbol, currencyCode} = Object.assign({}, DEFAULT_OPTS, opts)
  const symbol = getSymbol(currencyCode, currencySymbol)

  return formattedValue + (symbol ? ' ' + symbol: '')
}

export const getSymbol = (currencyCode: string, fallback?: ?string): ?string => symbols[currencyCode] || fallback

export default format
