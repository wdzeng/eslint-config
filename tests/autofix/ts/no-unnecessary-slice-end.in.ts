// Please also update JS/TS test if you are changing this file.
const arr = [1, 2, 3]
const sliced1 = arr.slice(1, arr.length)
const sliced2 = arr.slice(1, Number.POSITIVE_INFINITY)

const str = 'abc'
const slicedStr1 = str.slice(1, str.length)
const slicedStr2 = str.slice(1, Number.POSITIVE_INFINITY)
