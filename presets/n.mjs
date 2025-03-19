// @ts-check

// See https://github.com/eslint-community/eslint-plugin-n#-rules. Require at least
// eslint-plugin-n@^17 for n/hashbang rules.

import n from 'eslint-plugin-n'

/** @satisfies {import('eslint').Linter.RulesRecord} */
const DEFAULT_RULES = /** @types {const} */ {
  // Import/export-related.
  'n/no-extraneous-import': 'error',
  'n/no-extraneous-require': 'error',
  'n/no-unpublished-import': ['error', { ignoreTypeImport: true }],
  'n/no-unpublished-require': 'error',
  'n/no-unsupported-features/es-builtins': 'error',

  // Others
  'n/hashbang': 'warn', // cspell:ignore hashbang
  'n/no-deprecated-api': 'warn',
  'n/no-unsupported-features/es-syntax': 'error',
  'n/no-unsupported-features/node-builtins': 'error',
  'n/prefer-global/buffer': ['warn', 'always'],
  'n/prefer-global/console': ['warn', 'always'],
  'n/prefer-global/process': ['warn', 'always'],
  'n/prefer-global/text-decoder': ['warn', 'always'],
  'n/prefer-global/text-encoder': ['warn', 'always'],
  'n/prefer-global/url': ['warn', 'always'],
  'n/prefer-global/url-search-params': ['warn', 'always'],
  'n/process-exit-as-throw': 'warn'
}

/**
 * Don't enable 'n/no-unpublished-{import,require}' in TypeScript projects because these two rules
 * don't work well with TypeScript. The two rules require the import file name must have file name
 * extension, which is incompatible with my TypeScript style.
 *
 * @satisfies {import('eslint').Linter.RulesRecord}
 */
const JS_ONLY_RULES = /** @type {const} */ {
  'n/no-missing-import': 'error',
  'n/no-missing-require': 'error'
}

/** @return {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config} */
export function getJsConfig() {
  return {
    plugins: { n },
    rules: { ...DEFAULT_RULES, ...JS_ONLY_RULES }
  }
}

/** @return {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config} */
export function getTsConfig() {
  return {
    plugins: { n },
    rules: DEFAULT_RULES
  }
}
