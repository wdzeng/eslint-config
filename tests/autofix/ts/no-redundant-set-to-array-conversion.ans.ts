export function isUnique(array: unknown[]) {
  return new Set(array).size === array.length
}
