// Please also update JS/TS test if you are changing this file.
/* eslint-disable capitalized-comments */

export function* preferAt(str: string, i: number) {
  // TODO: some auto-fixings are not working (commented); check if they will be fixed in the future.

  yield str[0] // should not change non-negative index
  yield str[1] // should not change non-negative index
  yield str[i] // should not change variable index

  yield str.at(-1)
  yield str.at(-5)
  yield str.slice(-1) // not working
  yield str.slice(-1) // not working
  yield str.at(-1)
  yield str.slice(-5)[0] // not working
  yield str.charAt(str.length - 1) // not working
  yield str.charAt(str.length - 5) // not working
}

export function* preferIncludes(str: string) {
  yield str.includes('foo')
  yield str.includes('foo')
  yield str.includes('foo')
  yield str.includes('foo')
  yield str.includes('foo')
  yield str.includes('foo')
  yield !str.includes('foo')
  yield !str.includes('foo')
}

export function* preferNegativeIndex(str: string) {
  yield str.slice(-2, -1)
  yield str.slice(-1, 1)
  yield str.at(-1)
}

export function* preferReplaceAll(str: string) {
  yield str.replaceAll('RegExp with global flag', '')
  yield str.replaceAll('RegExp without special symbols', '')
  yield str.replaceAll('(It also checks for escaped regex symbols)', '')
  yield str.replaceAll('Works for u flag too', '')
  yield str.replaceAll('foo', 'bar')
}

export function* preferStarsWithAndEndWith(str: string) {
  // TODO: some auto-fixings are not working (commented); check if they will be fixed in the future.
  // These fixing involves @typescript-eslint/prefer-string-starts-ends-with, unicorn/prefer-at,
  // unicorn/prefer-negative-index, and unicorn/prefer-string-starts-ends-with rules.

  yield str.startsWith('b')
  yield str.at(0) === 'b' // not working
  yield str.startsWith('b')
  yield str.startsWith('bar')
  yield str.startsWith('bar')
  yield str.startsWith('bar')
  yield str.startsWith('bar')

  yield str.at(-1) === 'b' // not working
  yield str.at(-1) === 'b' // not working
  yield str.at(-1) === 'b' // not working
  yield str.endsWith('b')
  yield str.endsWith('bar')
  yield str.endsWith('bar')
  yield str.endsWith('bar')
  yield str.endsWith('bar')
}
