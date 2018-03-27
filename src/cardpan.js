// @flow

import type {
  IAny,
  IFormatted,
  IFormatter,
  IValidator
} from './interface'

export type IFormatNumberOpts = {
  strict: boolean;
  maskSymbol: string;
  digitDelimiter: string;
}

const DEFAULT_OPTS: IFormatNumberOpts = {
  strict: true,
  maskSymbol: '*',
  digitDelimiter: ' '
}

export const format: IFormatter = (value: IAny, opts?: ?IFormatNumberOpts): IFormatted => {
  // NOTE pan may be masked
  const cleared = ('' + value).replace(/[^*\d]/g, '')
  const {strict, digitDelimiter: dl} = Object.assign({}, DEFAULT_OPTS, opts)

  if (strict && !validate(value)) {
    throw new Error('formatCardPan: invalid input')
  }
  const len = cleared.length

  // American Express
  if (len === 15) {
    return cleared.replace(/^(.{4})(.{6})(.{5})$/, '$1' + dl + '$2' + dl + '$3');
  }

  // Visa, MasterCard, CUP, etc
  return cleared.replace(/(.{4})(?=(.){4,})/g, '$1' + dl)
}

export const validate: IValidator = (value: IAny, opts?: ?IFormatNumberOpts): boolean => {
  if (typeof value !== 'string') {
    return false
  }

  return value.length > 14 && value.length < 20
}

export default format
