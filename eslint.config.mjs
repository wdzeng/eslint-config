// @ts-check

import tsEslint from 'typescript-eslint'

import { getConfigForJs, getConfigForTs } from './index.mjs'

const generalConfigs = /** @type {import('typescript-eslint').ConfigArray} */ (
  getConfigForJs(
    {
      // We add file extensions to import JS and TS files in this project.
      'import-x/extensions': ['error', 'ignorePackages']
    },
    {
      browser: false,
      ecmaVersion: 2022,
      ignores: ['tests/**/*.js', 'tests/**/*.ts'],
      node: true,
      projectRoot: import.meta.dirname
    }
  )
)

let tsConfigs = /** @type {import('typescript-eslint').ConfigArray} */ (
  getConfigForTs(undefined, {
    browser: false,
    ecmaVersion: 2022,
    node: true,
    projectRoot: import.meta.dirname
  })
)

tsConfigs = tsEslint.config({
  extends: [tsConfigs],
  files: ['index.d.ts']
})

export default tsEslint.config(generalConfigs, tsConfigs)
