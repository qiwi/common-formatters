/**
 * @module @qiwi/common-formatter/lib/es5/util
 */

import { IAny } from './interface'

export function clearNumericValue(value: IAny): string {
  return ('' + value).replace(/[^\d*]/g, '')
}

export function isNumericString(value: IAny): boolean {
  return typeof value === 'string' && !isNaN(+value)
}
