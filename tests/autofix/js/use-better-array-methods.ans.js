// Please also update JS/TS test if you are changing this file.

const isFoo = (e) => e === 'foo'
const split = (str) => str.split(':')

export function* preferFind(array) {
  yield array.find((e) => isFoo(e))
  yield array.find((e) => isFoo(e))
  yield array.findLast((e) => isFoo(e))
  yield array.find((e) => isFoo(e))
  yield array.findLast((e) => isFoo(e))
  const w = array.find((e) => isFoo(e))
  yield w
}

export function* preferFlat(array) {
  yield array.flat()
  yield array.flat()
  yield array.flat()
}

export function* preferFlatMap(array) {
  yield array.flatMap((e) => split(e))
  yield array.flatMap((e) => split(e))
}

export function* preferIndexOf(array) {
  yield array.indexOf('foo')
  yield array.lastIndexOf('foo')
  yield array.indexOf('foo')
  yield array.lastIndexOf('foo')
  yield array.indexOf('foo')
  yield array.lastIndexOf('foo')
}

export function* preferSome(array) {
  yield array.some((e) => isFoo(e))
  yield array.some((e) => isFoo(e))
  yield array.filter((e) => isFoo(e)).length >= 1
  if (array.find((e) => isFoo(e))) {
    yield true
  }
  yield array.find((e) => isFoo(e)) ? 'bar' : 'baz'
  yield array.find((e) => isFoo(e)) !== undefined
  if (array.find((e) => isFoo(e))) {
    yield true
  }
  yield array.findLast((e) => isFoo(e)) ? 'bar' : 'baz'
  yield array.findLast((e) => isFoo(e)) !== undefined
  yield array.some((e) => isFoo(e))
  yield array.some((e) => isFoo(e))
}

export function* preferAt(array, i) {
  // Don't need to change to use at for non-negative or variable indexes.
  yield array[0]
  yield array[1]
  yield array[i]

  yield array.at(-1)
  yield array.at(-5)
  yield array.at(-1)
  yield array.at(-1)
  yield array.at(-1)
}

export function* preferIncludes(array) {
  yield array.includes('foo')
  yield array.includes('foo')
  yield array.includes('foo')
  yield array.includes('foo')
  yield !array.includes('foo')
  yield array.includes('foo')
  yield array.includes('foo')
  yield array.includes('foo')
}

export function* preferNegativeIndex(array) {
  yield array.slice(-2, -1)
  yield array.splice(-1, 1)
  yield array.at(-1)
}

export function noConsecutivePushes() {
  const ret = []
  ret.push('foo', 'foo')
  return ret
}

export function* noUselessLengthCheck(array) {
  yield array.every(Boolean)
  yield array.some(Boolean)
  yield array.every(Boolean)
}
