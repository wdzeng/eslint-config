import { getConfigForTs } from '../../index.mjs'

const config = getConfigForTs(
  {}, // No custom rules.
  {
    browser: false,
    ecmaVersion: 2022,
    node: true,
    projectRoot: import.meta.dirname
  }
)

export default config
