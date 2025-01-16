/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export function getProp(obj: { prop: unknown }) {
  // Should be `obj.prop`.
  return obj['prop']
}
