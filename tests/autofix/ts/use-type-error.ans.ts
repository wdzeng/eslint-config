// Please also update JS/TS test if you are changing this file.

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class U {}

export function f(foo: unknown) {
  if (typeof foo !== 'string') {
    throw new TypeError()
  }
  if (!Array.isArray(foo)) {
    throw new TypeError()
  }
  if (!Number.isNaN(foo)) {
    throw new TypeError()
  }
  if (Number.isNaN(foo)) {
    throw new TypeError()
  }
  // @ts-expect-error: suppress type error
  if (!(foo instanceof U)) {
    throw new TypeError()
  }
}
