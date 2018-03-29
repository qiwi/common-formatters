// @flow

import type {IAny} from './interface'

export function clearNumericValue(value: IAny): string {
  return ('' + value).replace(/[^*\d]/g, '')
}
