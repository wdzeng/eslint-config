export function isUnique(array) {
  return [...new Set(array)].length === array.length
}
