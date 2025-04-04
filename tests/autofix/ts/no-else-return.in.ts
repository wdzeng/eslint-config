// Please also update JS/TS test if you are changing this file.

export function isEven(a: number) {
  if (a % 2 === 0) {
    return true
  } else {
    return false
  }
}

export function isNegativeFloat(a: number) {
  if (Number.isInteger(a)) {
    return false
  } else if (Number.isFinite(a)) {
    return a < 0
  } else {
    return false
  }
}
