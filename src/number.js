// @flow

import type {
  IAny,
  IFormatted,
  IFormatter,
  IValidator
} from './interface'

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
