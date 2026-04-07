// @ts-check

import { getConfigForJs } from '../../../index.mjs'

export default getConfigForJs(
  {}, // No custom rules.
  {
    browser: false,
    ecmaVersion: 2023,
    node: true,
    vitest: true,
    ignores: ['eslint.config.mjs', '*.ans.js'],
    projectRoot: import.meta.dirname,
    testFiles: ['**/*.test.in.js']
  }
)
