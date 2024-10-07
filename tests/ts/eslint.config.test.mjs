import assert from 'node:assert'

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

assert.equal(config[1].name, 'language-options')
config[1].languageOptions.parserOptions.tsconfigRootDir = import.meta.dirname
config[1].languageOptions.parserOptions.project = './tsconfig.test.json'
delete config[1].languageOptions.parserOptions.projectService

export default config
