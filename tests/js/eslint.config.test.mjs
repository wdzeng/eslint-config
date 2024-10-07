import { getConfigForJs } from '../../index.mjs'

export default getConfigForJs(
  {}, // No custom rules.
  {
    browser: false,
    ecmaVersion: 2022,
    node: true,
    projectRoot: import.meta.dirname
  }
)
