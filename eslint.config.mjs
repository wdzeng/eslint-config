import { getConfigForJs } from './index.mjs'

export default getConfigForJs(
  {}, // No custom rules
  {
    browser: false,
    ecmaVersion: 2022,
    ignores: [
      'tests/js/in',
      'tests/js/ans',
      'tests/js/out',
      'tests/ts/in',
      'tests/ts/ans',
      'tests/ts/out'
    ],
    node: true
  }
)
