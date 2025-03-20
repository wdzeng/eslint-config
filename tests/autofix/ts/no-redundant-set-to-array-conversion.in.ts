export function isUnique(array: unknown[]) {
  return [...new Set(array)].length === array.length
}
