// Please also update JS/TS test if you are changing this file.

// Note that ESLint can only auto-fix `typeof` comparisons or when it knows two operands are of the
// same type.

export function isString(a) {
  return typeof a == 'string'
}

export function hasSameLength(a, b) {
  return a.length == b.length
}
