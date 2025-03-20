// Please also update JS/TS test if you are changing this file.

const isFoo = (e) => e === 'foo'
const split = (str) => str.split(':')

export function* preferFind(array) {
  yield array.filter((e) => isFoo(e))[0]
  yield array.filter((e) => isFoo(e)).at(0)
  yield array.filter((e) => isFoo(e)).at(-1)
  yield array.filter((e) => isFoo(e)).shift()
  yield array.filter((e) => isFoo(e)).pop()
  const [w] = array.filter((e) => isFoo(e))
  yield w
}

export function* preferFlat(array) {
  yield array.flatMap((e) => e)
  yield array.reduce((a, b) => a.concat(b), [])
  yield array.reduce((a, b) => [...a, ...b], [])
}

export function* preferFlatMap(array) {
  yield array.map((e) => split(e)).flat()
  yield array.map((e) => split(e)).flat(1)
}

export function* preferIndexOf(array) {
  yield array.findIndex((x) => x === 'foo')
  yield array.findLastIndex((x) => x === 'foo')
  yield array.findIndex((x) => 'foo' === x)
  yield array.findLastIndex((x) => 'foo' === x)
  yield array.findIndex((x) => {
    return x === 'foo'
  })
  yield array.findLastIndex((x) => {
    return x === 'foo'
  })
}

export function* preferSome(array) {
  yield array.filter((e) => isFoo(e)).length > 0
  yield array.filter((e) => isFoo(e)).length !== 0
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
  yield array.findIndex((e) => isFoo(e)) !== -1
  yield array.findLastIndex((e) => isFoo(e)) !== -1
}

export function* preferAt(array, i) {
  // Don't need to change to use at for non-negative or variable indexes.
  yield array[0]
  yield array[1]
  yield array[i]

  yield array[array.length - 1]
  yield array[array.length - 5]
  yield array.slice(-1)[0]
  yield array.slice(-1).pop()
  yield array.slice(-1).shift()
}

export function* preferIncludes(array) {
  yield array.indexOf('foo') !== -1
  yield array.lastIndexOf('foo') !== -1
  yield array.indexOf('foo') >= 0
  yield array.indexOf('foo') > -1
  yield array.indexOf('foo') === -1
  yield array.some((e) => e === 'foo')
  yield array.some((e) => 'foo' === e)
  yield array.some((e) => {
    return e === 'foo'
  })
}

export function* preferNegativeIndex(array) {
  yield array.slice(array.length - 2, array.length - 1)
  yield array.splice(array.length - 1, 1)
  yield array.at(array.length - 1)
}

export function noConsecutivePushes() {
  const ret = []
  ret.push('foo')
  ret.push('foo')
  return ret
}

export function* noUselessLengthCheck(array) {
  yield array.length === 0 || array.every(Boolean)
  yield array.length !== 0 && array.some(Boolean)
  yield array.length === 0 || array.every(Boolean)
}
