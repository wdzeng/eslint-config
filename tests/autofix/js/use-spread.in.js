// Please also update JS/TS test if you are changing this file.
/* eslint-disable no-unused-vars */

const set = new Set()
const array1 = []
const array2 = []
const string = 'string'
const foo = (e) => e + 1

Array.from(set).map((e) => foo(e))
const array = array1.concat(array2)
const copy1 = array.slice()
const copy2 = array.slice(0)
const copy3 = array.toSpliced()
const characters = string.split('')
