// As `Foo` is only used as type, it should be imported as type.
import type { Foo } from './utils'

export function isFoo(f: Foo | undefined): boolean {
  return f !== undefined
}
