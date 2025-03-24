// Please also update JS/TS test if you are changing this file.

import { expect, test } from 'vitest'

const x = 1
const b = false
const arr = [1, 2, 3]
const promise = new Promise(() => undefined)

// Hint: some auto-fixings are not available (commented). See if these bugs are fixed in the future.
test('foo', async () => {
  expect(x).toBe(1)
  expect(x).toBe('string')

  expect(x).toBeGreaterThan(0)
  expect(x).toBeGreaterThanOrEqual(0)
  expect(x === 0).toBe(true) //
  expect(x !== 0).toBe(true) //
  expect(x).toBeLessThanOrEqual(0)
  expect(x).toBeLessThan(0)
  expect(x).toBeLessThanOrEqual(0)
  expect(x).toBeLessThan(0)
  expect(x === 0).toBe(false) //
  expect(x !== 0).toBe(false) //
  expect(x).toBeGreaterThan(0)
  expect(x).toBeGreaterThanOrEqual(0)
  expect(x).toBeLessThanOrEqual(0)
  expect(x).toBeLessThan(0)
  expect(x === 0).not.toBe(true) //
  expect(x !== 0).not.toBe(true) //
  expect(x).toBeGreaterThan(0)
  expect(x).toBeGreaterThanOrEqual(0)
  expect(x).toBeGreaterThan(0)
  expect(x).toBeGreaterThanOrEqual(0)
  expect(x === 0).not.toBe(false) //
  expect(x !== 0).not.toBe(false) //
  expect(x).toBeLessThanOrEqual(0)
  expect(x).toBeLessThan(0)

  expect(b).toBe(true)
  expect(b).toBe(false)

  expect(arr).toHaveLength(1)
  expect(arr).toContain(1)

  await expect(promise).resolves.toBeUndefined()
})
