import { getConfigForJs } from '../../index.mjs'

export default getConfigForJs(
  {}, // No custom rules.
  {
    node: true,
    browser: false,
    ecmaVersion: 2022
  }
)
