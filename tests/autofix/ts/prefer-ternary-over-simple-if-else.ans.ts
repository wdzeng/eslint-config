// Please also update JS/TS test if you are changing this file.

// TODO: This auto-fixing is undesirable. Check if they will be improved in the future.
export function assignCase(a: unknown) {
  let b
  b = a ? 1 : 0
  return b
}

// TODO: auto-fixing is not working in this function; check if they will be fixed in the future.
export function returnCase(a: unknown) {
  if (a) {
    return 1
  }
  return 0
}

export function* yieldCase(a: unknown) {
  yield a ? 1 : 0
}

export function throwCase(a: unknown) {
  const error = a ? new Error('true') : new Error('false')
  throw error
}
