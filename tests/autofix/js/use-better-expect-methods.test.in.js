// Please also update JS/TS test if you are changing this file.

import { expect, test } from 'vitest'

const x = 1
const b = false
const arr = [1, 2, 3]
const promise = new Promise(() => undefined)

// Hint: some auto-fixings are not available (commented). See if these bugs are fixed in the future.
test('foo', async () => {
  expect(x).toEqual(1)
  expect(x).toEqual('string')

  expect(x > 0).toBe(true)
  expect(x >= 0).toBe(true)
  expect(x === 0).toBe(true) //
  expect(x !== 0).toBe(true) //
  expect(x <= 0).toBe(true)
  expect(x < 0).toBe(true)
  expect(x > 0).toBe(false)
  expect(x >= 0).toBe(false)
  expect(x === 0).toBe(false) //
  expect(x !== 0).toBe(false) //
  expect(x <= 0).toBe(false)
  expect(x < 0).toBe(false)
  expect(x > 0).not.toBe(true)
  expect(x >= 0).not.toBe(true)
  expect(x === 0).not.toBe(true) //
  expect(x !== 0).not.toBe(true) //
  expect(x <= 0).not.toBe(true)
  expect(x < 0).not.toBe(true)
  expect(x > 0).not.toBe(false)
  expect(x >= 0).not.toBe(false)
  expect(x === 0).not.toBe(false) //
  expect(x !== 0).not.toBe(false) //
  expect(x <= 0).not.toBe(false)
  expect(x < 0).not.toBe(false)

  expect(b).toBeTruthy()
  expect(b).toBeFalsy()

  expect(arr.length).toBe(1)
  expect(arr.includes(1)).toBe(true)

  expect(await promise).toBeUndefined()
})
