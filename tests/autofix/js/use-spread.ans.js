// Please also update JS/TS test if you are changing this file.
/* eslint-disable no-unused-vars */

const set = new Set()
const array1 = []
const array2 = []
const string = 'string'
const foo = (e) => e + 1

;[...set].map((e) => foo(e))
const array = [...array1, ...array2]
const copy1 = [...array]
const copy2 = [...array]
const copy3 = [...array]
const characters = [...string]
