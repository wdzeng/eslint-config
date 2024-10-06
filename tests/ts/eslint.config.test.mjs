import { getConfigForTs } from '../../index.mjs'

let config = getConfigForTs(
  {}, // No custom rules.
  {
    node: true,
    browser: false,
    ecmaVersion: 2022
  }
)

config = config.map((e) => {
  if (e.settings && e.settings.tsOnly) {
    if (!e.languageOptions) {
      e.languageOptions = {}
    }
    e.languageOptions.parserOptions = {
      project: ['./tsconfig.test.json'],
      tsconfigRootDir: import.meta.dirname
    }
  }
  return e
})

export default config
