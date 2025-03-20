// Please also update JS/TS test if you are changing this file.
/* eslint-disable capitalized-comments */
export default function* (value: string) {
  yield Number.NaN
  yield Number.POSITIVE_INFINITY
  yield Number.NEGATIVE_INFINITY

  yield Number.parseInt(value)
  yield Number.parseInt(value, 2)
  yield Number.parseFloat(value)
  // yield isNaN(value) // non-autofixable
  // yield isFinite(value) // non-autofixable
  yield Object.is(value, Number.NaN)
}
