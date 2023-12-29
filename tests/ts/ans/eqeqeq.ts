// Should use `===` instead of `==`. Note that ESLint can only auto-fix `typeof` comparisons or when
// it knows two operands are of the same type.

export function isString(a: unknown) {
  return typeof a === 'string'
}
