// Please also update JS/TS test if you are changing this file.

// If statement should use positive condition.
export function checkBoolean(a: unknown) {
  if (!a) {
    console.log('a is falsy')
  } else {
    console.log('a is truthy')
  }
}
