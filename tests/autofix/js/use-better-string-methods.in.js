// Please also update JS/TS test if you are changing this file.
/* eslint-disable capitalized-comments */

export function* preferCharAt(str, i) {
  // TODO: some auto-fixings are not working (commented); check if they will be fixed in the future.

  yield str[0] // should not change non-negative index
  yield str[1] // should not change non-negative index
  yield str[i] // should not change variable index

  yield str[str.length - 1]
  yield str[str.length - 5]
  yield str.slice(-1) // not working
  yield str.slice(str.length - 1)
  yield str.slice(-1)[0] // not working
  yield str.slice(-5)[0] // not working
  yield str.charAt(str.length - 1) // not working
  yield str.charAt(str.length - 5) // not working
}

export function* preferIncludes(str) {
  yield str.indexOf('foo') !== -1
  yield str.lastIndexOf('foo') !== -1
  yield str.indexOf('foo') >= 0
  yield str.lastIndexOf('foo') >= 0
  yield str.indexOf('foo') > -1
  yield str.lastIndexOf('foo') > -1
  yield str.indexOf('foo') === -1
  yield str.lastIndexOf('foo') === -1
}

export function* preferNegativeIndex(str) {
  yield str.slice(str.length - 1, 1)
  yield str.slice(str.length - 2, str.length - 1)
  yield str.at(str.length - 1)
}

export function* preferReplaceAll(str) {
  yield str.replace(/RegExp with global flag/igu, '')
  yield str.replace(/RegExp without special symbols/g, '')
  yield str.replace(/\(It also checks for escaped regex symbols\)/g, '')
  yield str.replace(/Works for u flag too/gu, '')
}

export function* preferStarsWithAndEndWith(str) {
  // TODO: some auto-fixings are not working (commented); check if they will be fixed in the future.
  // These fixing involves @typescript-eslint/prefer-string-starts-ends-with, unicorn/prefer-at,
  // unicorn/prefer-negative-index, and unicorn/prefer-string-starts-ends-with rules.

  yield str[0] === 'b' // not working
  yield str.charAt(0) === 'b' // not working
  yield str.indexOf('bar') === 0 // not working
  yield str.slice(0, 3) === 'bar' // not working
  yield str.substring(0, 3) === 'bar' // not working
  yield /^bar/.test(str)

  yield str[str.length - 1] === 'b' // not working
  yield str.charAt(str.length - 1) === 'b' // not working
  yield str.lastIndexOf('bar') === str.length - 3 // not working
  yield str.slice(-3) === 'bar' // not working
  yield str.substring(str.length - 3) === 'bar' // not working
  yield /bar$/.test(str)
}
