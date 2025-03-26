import { getConfigForTs } from '../../../index.mjs'

const configs = getConfigForTs(
  {}, // No custom rules.
  {
    browser: false,
    ecmaVersion: 2022,
    node: true,
    vitest: true,
    ignores: ['eslint.config.mjs'],
    projectRoot: import.meta.dirname
  }
)

// Modify the recognized test file patterns so we could test the test files for vitest.
//
// @ts-expect-error: the config file is an array
configs.find((c) => c.name === 'vitest').files = ['**/*.test.in.ts']

export default configs
