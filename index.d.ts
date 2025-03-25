import type { TSESLint } from '@typescript-eslint/utils'
import type { Linter } from 'eslint'

interface Options {
  projectRoot: string
  ecmaVersion?: Linter.EcmaVersion
  ignores?: string[]
  node?: boolean
  browser?: boolean
  vitest?: boolean
}

export function getConfigForJs(
  userRules: Linter.RulesRecord | undefined,
  options: Options
): TSESLint.FlatConfig.ConfigFile

export function getConfigForTs(
  userRules: Linter.RulesRecord | undefined,
  options: Options
): TSESLint.FlatConfig.ConfigFile
