import { getConfigForTs } from '../../../index.mjs'

export default getConfigForTs(
  {}, // No custom rules.
  {
    browser: false,
    ecmaVersion: 2022,
    node: true,
    vitest: true,
    ignores: ['eslint.config.mjs'],
    projectRoot: import.meta.dirname,
    testFiles: ['**/*.test.in.ts']
  }
)
