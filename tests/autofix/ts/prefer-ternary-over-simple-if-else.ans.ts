// Please also update JS/TS test if you are changing this file.

// Not working.
// export function returnCase(a) {
//   if (a) {
//     return 1
//   } else {
//     return 0
//   }
// }

export function* yieldCase(a) {
  yield a ? 1 : 0
}

export function throwCase(a) {
  const error = a ? new Error('true') : new Error('false')
  throw error
}
