// Please also update JS/TS test if you are changing this file.

// TODO: This auto-fixing is undesirable. Check if they will be improved in the future.
export function assignCase(a) {
  let b
  if (a) {
    b = 1
  } else {
    b = 0
  }
  return b
}

// TODO: auto-fixing is not working in this function; check if they will be fixed in the future.
export function returnCase(a) {
  if (a) {
    return 1
  } else {
    return 0
  }
}

export function* yieldCase(a) {
  if (a) {
    yield 1
  } else {
    yield 0
  }
}

export function throwCase(a) {
  if (a) {
    throw new Error('true')
  } else {
    throw new Error('false')
  }
}
