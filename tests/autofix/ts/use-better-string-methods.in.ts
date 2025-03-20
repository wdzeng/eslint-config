// Please also update JS/TS test if you are changing this file.
/* eslint-disable capitalized-comments */

export function* preferAt(str: string) {
  yield str[str.length - 1]
  yield str[str.length - 5]
}

export function* preferIncludes(str: string) {
  yield str.indexOf('foo') !== -1
  yield str.lastIndexOf('foo') !== -1
  yield str.indexOf('foo') >= 0
  yield str.lastIndexOf('foo') >= 0
  yield str.indexOf('foo') > -1
  yield str.lastIndexOf('foo') > -1
  yield str.indexOf('foo') === -1
  yield str.lastIndexOf('foo') === -1
}

export function* preferNegativeIndex(str: string) {
  yield str.slice(str.length - 2, str.length - 1)
  yield str.slice(str.length - 1, 1)
  yield str.at(str.length - 1)
}

export function* preferReplaceAll(str: string) {
  yield str.replace(/RegExp with global flag/igu, '')
  yield str.replace(/RegExp without special symbols/g, '')
  yield str.replace(/\(It also checks for escaped regex symbols\)/g, '')
  yield str.replace(/Works for u flag too/gu, '')
  yield str.replaceAll(/foo/g, 'bar')
}

export function* preferStarsWithAndEndWith(str: string) {
  yield str[0] === 'b'
  yield str.charAt(0) === 'b'
  yield str.indexOf('bar') === 0
  yield str.slice(0, 3) === 'bar'
  yield str.substring(0, 3) === 'bar'
  yield /^bar/.test(str)

  yield str[str.length - 1] === 'b'
  yield str.charAt(str.length - 1) === 'b'
  yield str.lastIndexOf('bar') === str.length - 3
  yield str.slice(-3) === 'bar'
  yield str.substring(str.length - 3) === 'bar'
  yield /bar$/.test(str)
}
