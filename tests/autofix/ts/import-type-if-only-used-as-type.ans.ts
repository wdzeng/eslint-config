import type { Foo } from './utils'

export function isFoo(f: Foo | undefined): boolean {
  return f !== undefined
}
