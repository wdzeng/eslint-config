// Please also update JS/TS test if you are changing this file.
export function foo(str: string) {
  if (str.match(/foo/)) {
    throw new Error()
  }
  if (/foo/.exec(str)) {
    throw new Error()
  }
}
