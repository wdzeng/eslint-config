import type { Linter } from 'eslint'
import type { Config } from 'eslint/config'

interface Options {
  projectRoot: string
  ecmaVersion?: Linter.EcmaVersion
  ignores?: string[]
  node?: boolean
  browser?: boolean
  vitest?: boolean
  testFiles?: string[]
}

export function getConfigForJs(
  userRules: Linter.RulesRecord | undefined,
  options: Options
): Config[]

export function getConfigForTs(
  userRules: Linter.RulesRecord | undefined,
  options: Options
): Config[]
