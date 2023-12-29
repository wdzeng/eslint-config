/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export function getPoop(a: {poop: unknown}) {
  // Should be a.poop
  return a['poop']
}
