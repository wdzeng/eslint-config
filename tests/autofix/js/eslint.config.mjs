// @ts-check

import { getConfigForJs } from '../../../index.mjs'

const configs = getConfigForJs(
  {}, // No custom rules.
  {
    browser: false,
    ecmaVersion: 2022,
    node: true,
    vitest: true,
    ignores: ['eslint.config.mjs', '*.ans.js'],
    projectRoot: import.meta.dirname
  }
)

// Modify the recognized test file patterns so we could test the test files for vitest.
//
// @ts-expect-error: the config file is an array
configs.find((c) => c.name === 'vitest').files = ['**/*.test.in.js']

export default configs
