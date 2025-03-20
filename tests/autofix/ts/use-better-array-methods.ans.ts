// Please also update JS/TS test if you are changing this file.

const isFoo = (e: unknown) => e === 'foo'
const split = (str: string) => str.split(':')

export function* shouldUseFind(array: unknown[]) {
  yield array.find((e) => isFoo(e))
  yield array.find((e) => isFoo(e))
  yield array.findLast((e) => isFoo(e))
  yield array.find((e) => isFoo(e))
  yield array.findLast((e) => isFoo(e))
  const w = array.find((e) => isFoo(e))
  yield w
}

export function* shouldUseFlat(array: unknown[][]) {
  yield array.flat()
  yield array.flat()
  yield array.flat()
}

export function* shouldUseFlatMap(array: string[]) {
  yield array.flatMap((e) => split(e))
  yield array.flatMap((e) => split(e))
}

export function* shouldUseIndexOf(array: unknown[]) {
  yield array.indexOf('foo')
  yield array.indexOf('foo')
  yield array.indexOf('foo')
  yield array.lastIndexOf('foo')
  yield array.lastIndexOf('foo')
  yield array.lastIndexOf('foo')
}

export function* shouldUseSome(array: unknown[]) {
  yield array.some((e) => isFoo(e))
  yield array.some((e) => isFoo(e))
  yield array.filter((e) => isFoo(e)).length >= 1
  if (array.find((e) => isFoo(e))) {
    yield true
  }
  yield array.find((e) => isFoo(e)) ? 'bar' : 'baz'
  yield array.find((e) => isFoo(e)) !== undefined
  // eslint-disable-next-line eqeqeq, unicorn/no-null
  yield array.find((e) => isFoo(e)) != null
  if (array.find((e) => isFoo(e))) {
    yield true
  }
  yield array.findLast((e) => isFoo(e)) ? 'bar' : 'baz'
  yield array.findLast((e) => isFoo(e)) !== undefined
  // eslint-disable-next-line eqeqeq, unicorn/no-null
  yield array.findLast((e) => isFoo(e)) != null
  yield array.some((e) => isFoo(e))
  yield array.some((e) => isFoo(e))
}

export function* shouldUseAt(array: unknown[]) {
  yield array.at(-1)
  yield array.at(-5)
  yield array.at(-1)
  yield array.at(-1)
  yield array.at(-1)
}

export function noConsecutivePushes() {
  const ret = []
  ret.push('foo', 'foo')
  return ret
}
