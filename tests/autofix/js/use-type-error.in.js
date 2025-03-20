// Please also update JS/TS test if you are changing this file.

class U {}

export function f(foo) {
  if (typeof foo !== 'string') {
    throw new Error()
  }
  if (!Array.isArray(foo)) {
    throw new Error()
  }
  if (!Number.isNumber(foo) || Number.isNaN(foo)) {
    throw new Error()
  }
  if (Number.isNaN(foo)) {
    throw new Error()
  }
  if (!(foo instanceof U)) {
    throw new Error()
  }
}
