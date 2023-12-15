export function isEven(a) {
  if (a % 2 === 0) {
    return true
  }
  return false
}

export function isNegativeFloat(a) {
  if (Number.isInteger(a)) {
    return false
  }
  if (Number.isFinite(a)) {
    return a < 0
  }
  return false
}
