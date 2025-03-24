// Please also update JS/TS test if you are changing this file.

import { expect, test, vi } from 'vitest'

const a = vi.fn(() => undefined)

test('foo', () => {
  expect(a).toHaveBeenCalled()
  expect(a).toHaveBeenCalledTimes(1)
})
