// Please also update JS/TS test if you are changing this file.

export function isEven(a: number) {
  if (a % 2 === 0) {
    return true
  }
  return false
}

export function isNegativeFloat(a: number) {
  if (Number.isInteger(a)) {
    return false
  }
  if (Number.isFinite(a)) {
    return a < 0
  }
  return false
}
