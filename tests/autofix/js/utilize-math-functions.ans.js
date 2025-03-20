// Please also update JS/TS test if you are changing this file.

export function preferMinMax(value) {
  Math.min(value, 50)
  Math.min(value, 50)
  Math.min(value, 50)
  Math.min(value, 50)
  Math.max(value, 50)
  Math.max(value, 50)
  Math.max(value, 50)
  Math.max(value, 50)
}

export function preferTrunc(value) {
  Math.trunc(value)
  value = Math.trunc(value)
  Math.trunc(value)
  Math.trunc(value)
  Math.trunc(value.bar)
}

export function preferLog10(value) {
  Math.log10(value)
  Math.log10(value)
  Math.log10(value)
}

export function preferLog2(value) {
  Math.log2(value)
  Math.log2(value)
  Math.log2(value)
}

export function preferHypot(a, b) {
  Math.hypot(a, b)
  Math.hypot(a, b)
  Math.hypot(a, b)
}
