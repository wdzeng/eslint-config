// As `Foo` is only used as type, it should be imported as type.
import type { Foo } from 'foo'

/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */

export function isGoodFoo(f: Foo): boolean {
  return f.good
}
