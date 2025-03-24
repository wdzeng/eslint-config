// @ts-check
// See https://github.com/eslint-community/eslint-plugin-n#-rules.

import n from 'eslint-plugin-n'

/** @satisfies {import('eslint').Linter.RulesRecord} */
const DEFAULT_RULES = /** @type {const} */ {
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

/** @satisfies {import('eslint').Linter.RulesRecord} */
const DEV_OVERRIDES_RULES = /** @type {const} */ {
  'n/no-unpublished-import': 'off',
  'n/no-unpublished-require': 'off'
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

/**
 * @typedef Options
 * @prop {string} projectRoot The root directory of the project
 * @prop {boolean} [node] Whether the runtime is Node.js
 * @prop {boolean} [browser] Whether the runtime is a browser
 */

/**
 * @param {Options} _options
 * @return {[import('typescript-eslint').ConfigArray, import('typescript-eslint').ConfigArray]}
 */
export function getJsConfigs(_options) {
  return [
    [
      {
        plugins: { n },
        rules: { ...DEFAULT_RULES, ...JS_ONLY_RULES }
      }
    ],
    [{ rules: DEV_OVERRIDES_RULES }]
  ]
}

/**
 * @param {Options} _options
 * @return {[import('typescript-eslint').ConfigArray, import('typescript-eslint').ConfigArray]}
 */
export function getTsConfigs(_options) {
  return [
    [
      {
        plugins: { n },
        rules: DEFAULT_RULES
      }
    ],
    [{ rules: DEV_OVERRIDES_RULES }]
  ]
}
