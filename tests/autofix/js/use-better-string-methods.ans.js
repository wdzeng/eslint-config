// Please also update JS/TS test if you are changing this file.
/* eslint-disable capitalized-comments */

export function* preferCharAt(str, i) {
  // TODO: some auto-fixings are not working (commented); check if they will be fixed in the future.

  yield str[0] // should not change non-negative index
  yield str[1] // should not change non-negative index
  yield str[i] // should not change variable index

  yield str.at(-1)
  yield str.at(-5)
  yield str.slice(-1) // not working
  yield str.slice(-1)
  yield str.at(-1) // not working
  yield str.slice(-5)[0] // not working
  yield str.charAt(str.length - 1) // not working
  yield str.charAt(str.length - 5) // not working
}

export function* preferIncludes(str) {
  yield str.includes('foo')
  yield str.includes('foo')
  yield str.includes('foo')
  yield str.includes('foo')
  yield str.includes('foo')
  yield str.includes('foo')
  yield !str.includes('foo')
  yield !str.includes('foo')
}

export function* preferNegativeIndex(str) {
  yield str.slice(-1, 1)
  yield str.slice(-2, -1)
  yield str.at(-1)
}

export function* preferReplaceAll(str) {
  yield str.replaceAll(/RegExp with global flag/giu, '')
  yield str.replaceAll('RegExp without special symbols', '')
  yield str.replaceAll('(It also checks for escaped regex symbols)', '')
  yield str.replaceAll('Works for u flag too', '')
}

export function* preferStarsWithAndEndWith(str) {
  // TODO: some auto-fixings are not working (commented); check if they will be fixed in the future.
  // These fixing involves @typescript-eslint/prefer-string-starts-ends-with, unicorn/prefer-at,
  // unicorn/prefer-negative-index, and unicorn/prefer-string-starts-ends-with rules.

  yield str[0] === 'b' // not working
  yield str.charAt(0) === 'b' // not working
  yield str.indexOf('bar') === 0 // not working
  yield str.slice(0, 3) === 'bar' // not working
  yield str.slice(0, 3) === 'bar' // not working
  yield str.startsWith('bar')

  yield str.at(-1) === 'b' // not working
  yield str.charAt(str.length - 1) === 'b' // not working
  yield str.lastIndexOf('bar') === str.length - 3 // not working
  yield str.slice(-3) === 'bar' // not working
  yield str.slice(Math.max(0, str.length - 3)) === 'bar' // not working
  yield str.endsWith('bar')
}
