// Please also update JS/TS test if you are changing this file.
/* eslint-disable capitalized-comments */

// TODO: check if some non-working snippets are fixed in the latest version of
// eslint-plugin-unicorn.

export function* preferCharAt(str, i) {
  // Don't need to change to use at for non-negative or variable indexes.
  yield str[0]
  yield str[1]
  yield str[i]

  yield str[str.length - 1]
  yield str[str.length - 5]
  yield str.slice(-1)[0]
  yield str.slice(-1).pop()
  yield str.slice(-1).shift()
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
  // yield str[0] === 'b' // not working
  // yield str.charAt(0) === 'b' // not working
  // yield str.indexOf('bar') === 0 // not working
  // yield str.slice(0, 3) === 'bar' // not working
  // yield str.substring(0, 3) === 'bar' // not working
  yield /^bar/.test(str)

  // yield str[str.length - 1] === 'b' // not working
  // yield str.charAt(str.length - 1) === 'b' // not working
  // yield str.lastIndexOf('bar') === str.length - 3 // not working
  // yield str.slice(-3) === 'bar' // not working
  // yield str.substring(str.length - 3) === 'bar' // not working
  yield /bar$/.test(str)
}
