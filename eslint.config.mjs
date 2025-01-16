// @ts-check

import { getConfigForJs } from './index.mjs'

/** @satisfies {import('eslint').Linter.RulesRecord} */
export const DEFAULT_RULES = /** @type {const} */ {
  'import-x/no-relative-parent-imports': 'off',

  // We add file extensions to import JS and TS files in this project.
  'import-x/extensions': ['error', 'ignorePackages']
}

/** @returns {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default getConfigForJs(DEFAULT_RULES, {
  browser: false,
  ecmaVersion: 2022,
  ignores: ['tests/**/*.js', 'tests/**/*.ts'],
  node: true,
  projectRoot: import.meta.dirname
})
