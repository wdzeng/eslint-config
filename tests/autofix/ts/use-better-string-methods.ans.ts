// Please also update JS/TS test if you are changing this file.

export function* preferAt(str: string) {
  yield str.at(-1)
  yield str.at(-5)
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
  yield str.replaceAll(/RegExp with global flag/giu, '')
  yield str.replaceAll('RegExp without special symbols', '')
  yield str.replaceAll('(It also checks for escaped regex symbols)', '')
  yield str.replaceAll('Works for u flag too', '')
  yield str.replaceAll('foo', 'bar')
}

export function* preferStarsWithAndEndWith(str: string) {
  yield str.startsWith('b')
  yield str.startsWith('b')
  yield str.startsWith('bar')
  yield str.startsWith('bar')
  yield str.startsWith('bar')
  yield str.startsWith('bar')

  yield str.at(-1) === 'b'
  yield str.endsWith('b')
  yield str.endsWith('bar')
  yield str.endsWith('bar')
  yield str.endsWith('bar')
  yield str.endsWith('bar')
}
