// Please also update JS/TS test if you are changing this file.

const isFoo = (e: unknown) => e === 'foo'
const split = (str: string) => str.split(':')

export function* shouldUseFind(array: unknown[]) {
  yield array.filter((e) => isFoo(e))[0]
  yield array.filter((e) => isFoo(e)).at(0)
  yield array.filter((e) => isFoo(e)).at(-1)
  yield array.filter((e) => isFoo(e)).shift()
  yield array.filter((e) => isFoo(e)).pop()
  const [w] = array.filter((e) => isFoo(e))
  yield w
}

export function* shouldUseFlat(array: unknown[][]) {
  yield array.flatMap((e) => e)
  yield array.reduce((a, b) => a.concat(b), [])
  yield array.reduce((a, b) => [...a, ...b], [])
}

export function* shouldUseFlatMap(array: string[]) {
  yield array.map((e) => split(e)).flat()
  yield array.map((e) => split(e)).flat(1)
}

export function* shouldUseIndexOf(array: unknown[]) {
  yield array.findIndex((x) => x === 'foo')
  yield array.findIndex((x) => 'foo' === x)
  yield array.findIndex((x) => {
    return x === 'foo'
  })
  yield array.findLastIndex((x) => x === 'foo')
  yield array.findLastIndex((x) => 'foo' === x)
  yield array.findLastIndex((x) => {
    return x === 'foo'
  })
}

export function* shouldUseSome(array: unknown[]) {
  yield array.filter((e) => isFoo(e)).length > 0
  yield array.filter((e) => isFoo(e)).length !== 0
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
  yield array.findIndex((e) => isFoo(e)) !== -1
  yield array.findLastIndex((e) => isFoo(e)) !== -1
}

export function* shouldUseAt(array: unknown[]) {
  yield array[array.length - 1]
  yield array[array.length - 5]
  yield array.slice(-1)[0]
  yield array.slice(-1).pop()
  yield array.slice(-1).shift()
}

export function noConsecutivePushes() {
  const ret = []
  ret.push('foo')
  ret.push('foo')
  return ret
}
