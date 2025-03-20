// Please also update JS/TS test if you are changing this file.
/* eslint-disable capitalized-comments */
// TODO: check some example can be fixable in the future release of eslint-plugin-unicorn.

export function* shouldAddNew() {
  // yield Object() // unrealistic
  // yield Array() // unrealistic
  yield new ArrayBuffer()
  yield new BigInt64Array()
  yield new BigUint64Array()
  yield new DataView(new ArrayBuffer())
  // yield Date() // not working
  yield new Error()
  yield new Float32Array()
  yield new Float64Array()
  // yield Function() // unrealistic
  yield new Int8Array()
  yield new Int16Array()
  yield new Int32Array()
  yield new Map()
  yield new WeakMap()
  yield new Set()
  yield new WeakSet()
  yield new Promise((g) => g)
  yield new RegExp(/g/)
  yield new Uint8Array()
  yield new Uint16Array()
  yield new Uint32Array()
  yield new Uint8ClampedArray()
  yield new SharedArrayBuffer()
  yield new Proxy({}, {})
}

export function* noNew() {
  // yield new String() // non-autofixable
  // yield new Number() // non-autofixable
  // yield new Boolean() // non-autofixable
  yield Symbol()
  yield BigInt(0)

  yield Buffer.from('7468697320697320612074c3a97374', 'hex')
  yield Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
  yield Buffer.alloc(10)
}
