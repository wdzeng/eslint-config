// Please also update JS/TS test if you are changing this file.
export function foo(string) {
  if (string.match(/foo/)) {
    throw new Error()
  }
  if (/foo/.exec(string)) {
    throw new Error()
  }
}
