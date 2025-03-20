// Please also update JS/TS test if you are changing this file.
/* eslint-disable capitalized-comments */
export default function* (value) {
  yield NaN
  yield Infinity
  yield -Infinity

  yield parseInt(value)
  yield parseInt(value, 2)
  yield parseFloat(value)
  // yield isNaN(value) // non-autofixable
  // yield isFinite(value) // non-autofixable
  yield Object.is(value, NaN)
}
