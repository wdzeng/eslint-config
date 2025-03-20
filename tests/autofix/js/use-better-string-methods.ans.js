// Please also update JS/TS test if you are changing this file.
/* eslint-disable capitalized-comments */

// TODO: check if some non-working snippets are fixed in the latest version of
// eslint-plugin-unicorn.

export function* preferCharAt(str, i) {
  // Don't need to change to use at for non-negative or variable indexes.
  yield str[0]
  yield str[1]
  yield str[i]

  yield str.at(-1)
  yield str.at(-5)
  yield str.at(-1)
  yield str.at(-1)
  yield str.at(-1)
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
  // yield str[0] === 'b' // not working
  // yield str.charAt(0) === 'b' // not working
  // yield str.indexOf('bar') === 0 // not working
  // yield str.slice(0, 3) === 'bar' // not working
  // yield str.substring(0, 3) === 'bar' // not working
  yield str.startsWith('bar')

  // yield str[str.length - 1] === 'b' // not working
  // yield str.charAt(str.length - 1) === 'b' // not working
  // yield str.lastIndexOf('bar') === str.length - 3 // not working
  // yield str.slice(-3) === 'bar' // not working
  // yield str.substring(str.length - 3) === 'bar' // not working
  yield str.endsWith('bar')
}
