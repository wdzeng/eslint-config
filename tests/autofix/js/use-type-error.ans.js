// Please also update JS/TS test if you are changing this file.

class U {}

export function f(foo) {
  if (typeof foo !== 'string') {
    throw new TypeError()
  }
  if (!Array.isArray(foo)) {
    throw new TypeError()
  }
  if (!Number.isNumber(foo) || Number.isNaN(foo)) {
    throw new TypeError()
  }
  if (Number.isNaN(foo)) {
    throw new TypeError()
  }
  if (!(foo instanceof U)) {
    throw new TypeError()
  }
}
