// Please also update JS/TS test if you are changing this file.
/* eslint-disable capitalized-comments */

export function* shouldAddNew() {
  // yield Object() // Don't need to autofix this; it's unrealistic
  // yield Array() // Don't need to autofix this; it's unrealistic
  yield ArrayBuffer()
  yield BigInt64Array()
  yield BigUint64Array()
  yield DataView(ArrayBuffer())
  yield Date() // TODO: wrong auto-fixing result; check if it will be fixed in the future.
  yield Error()
  yield Float32Array()
  yield Float64Array()
  // yield Function() // Don't need to autofix this; it's unrealistic
  yield Int8Array()
  yield Int16Array()
  yield Int32Array()
  yield Map()
  yield WeakMap()
  yield Set()
  yield WeakSet()
  yield Promise((g) => g)
  yield RegExp(/g/)
  yield Uint8Array()
  yield Uint16Array()
  yield Uint32Array()
  yield Uint8ClampedArray()
  yield SharedArrayBuffer()
  yield Proxy({}, {})
}

export function* noNew() {
  // yield new String() // non-autofixable
  // yield new Number() // non-autofixable
  // yield new Boolean() // non-autofixable
  yield new Symbol()
  yield new BigInt(0)

  // Don't need to test deprecated APIs.
  // yield new Buffer('7468697320697320612074c3a97374', 'hex')
  // yield new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
  // yield new Buffer(10)
}
