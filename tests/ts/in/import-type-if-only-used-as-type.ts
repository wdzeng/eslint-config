// As `Foo` is only used as type, it should be imported as type.
import { Foo } from 'foo'

export function isGoodFoo(f: Foo): boolean {
  return f.good
}
