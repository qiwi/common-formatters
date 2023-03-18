import {formatCardPan} from '@qiwi/common-formatters'

describe('package', () => {
  it('works as ESM', () => {
    expect(formatCardPan).toEqual(expect.any(Function))
  })
})
