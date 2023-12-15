export function isEven(a) {
  if (a % 2 === 0) {
    return true
  } else {
    return false
  }
}

export function isNegativeFloat(a) {
  if (Number.isInteger(a)) {
    return false
  } else if (Number.isFinite(a)) {
    return a < 0
  } else {
    return false
  }
}
