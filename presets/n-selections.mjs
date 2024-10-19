// https://github.com/eslint-community/eslint-plugin-n#-rules
//
// Require at least eslint-plugin-n@^17 for n/hashbang rules.

const DEFAULT_RULES = {
  // Import/export-related.
  'n/no-extraneous-import': 'error',
  'n/no-extraneous-require': 'error',
  // Only enable this rule in production files. Add this in the index.mjs.
  // 'n/no-unpublished-import': ['error', { ignoreTypeImport: true }],
  'n/no-unpublished-require': 'error',
  'n/no-unsupported-features/es-builtins': 'error',

  // Others

  // cspell:ignore hashbang
  'n/hashbang': 'warn',
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

const JS_ONLY_RULES = {
  'n/no-missing-import': 'error',
  'n/no-missing-require': 'error'
}

export const nSelectionsForJs = Object.assign({}, DEFAULT_RULES, JS_ONLY_RULES)

export const nSelectionsForTs = DEFAULT_RULES
