// Please also update JS/TS test if you are changing this file.
/* eslint-disable no-unused-expressions */

export function preferMinMax(value) {
  value > 50 ? 50 : value
  value >= 50 ? 50 : value
  value < 50 ? value : 50
  value <= 50 ? value : 50
  value > 50 ? value : 50
  value >= 50 ? value : 50
  value < 50 ? 50 : value
  value <= 50 ? 50 : value
}

export function preferTrunc(value) {
  ~~value
  value |= 0
  value << 0
  value >> 0
  value.bar ^ 0
}

export function preferLog10(value) {
  Math.log(value) * Math.LOG10E
  Math.LOG10E * Math.log(value)
  Math.log(value) / Math.LN10
}

export function preferLog2(value) {
  Math.log(value) * Math.LOG2E
  Math.LOG2E * Math.log(value)
  Math.log(value) / Math.LN2
}

export function preferHypot(a, b) {
  Math.sqrt(a * a + b * b)
  Math.sqrt(a ** 2 + b ** 2)
  Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}
