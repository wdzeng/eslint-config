// Please also update JS/TS test if you are changing this file.

// TODO: This auto-fixing is undesirable. Check if they will be improved in the future.
export function assignCase(a) {
  let b
  b = a ? 1 : 0
  return b
}

// TODO: auto-fixing is not working in this function; check if they will be fixed in the future.
export function returnCase(a) {
  if (a) {
    return 1
  }
  return 0
}

export function* yieldCase(a) {
  yield a ? 1 : 0
}

export function throwCase(a) {
  const error = a ? new Error('true') : new Error('false')
  throw error
}
