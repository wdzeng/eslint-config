// @ts-check

import { getConfigForJs } from './index.mjs'

/** @returns {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default getConfigForJs(
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
