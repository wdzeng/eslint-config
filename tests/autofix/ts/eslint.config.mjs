import { getConfigForTs } from '../../../index.mjs'

export default getConfigForTs(
  {}, // No custom rules.
  {
    browser: false,
    ecmaVersion: 2022,
    node: true,
    ignores: ['eslint.config.mjs'],
    projectRoot: import.meta.dirname
  }
)
