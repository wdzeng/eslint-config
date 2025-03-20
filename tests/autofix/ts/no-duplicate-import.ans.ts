// Please also update JS/TS test if you are changing this file.

import { dirname, join } from 'node:path'

import type { ParsedPath } from 'node:path'

export function foo(p: ParsedPath) {
  return p
}

console.log(dirname, join)
