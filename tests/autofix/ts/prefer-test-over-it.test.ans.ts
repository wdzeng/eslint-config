// Please also update JS/TS test if you are changing this file.

import { describe, expect } from 'vitest'

test('foo', () => {
  expect(1).toBe(1)
})

describe('bar', () => {
  test('baz', () => {
    expect(1).toBe(1)
  })
})
