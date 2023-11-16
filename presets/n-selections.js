// https://github.com/eslint-community/eslint-plugin-n#-rules

module.exports = {
  'n/no-deprecated-api': 'warn',
  'n/no-extraneous-import': 'error',
  'n/no-extraneous-require': 'error',
  'n/no-missing-import': 'error',
  'n/no-missing-require': 'error',
  'n/no-unpublished-import': ['error', { ignoreTypeImport: true }],
  'n/no-unpublished-require': 'error',
  'n/no-unsupported-features/es-builtins': 'error',
  'n/no-unsupported-features/es-syntax': 'error',
  'n/no-unsupported-features/node-builtins': 'error',
  'n/prefer-global/buffer': ['warn', 'always'],
  'n/prefer-global/console': ['warn', 'always'],
  'n/prefer-global/process': ['warn', 'always'],
  'n/prefer-global/text-decoder': ['warn', 'always'],
  'n/prefer-global/text-encoder': ['warn', 'always'],
  'n/prefer-global/url': ['warn', 'always'],
  'n/prefer-global/url-search-params': ['warn', 'always'],
  'n/process-exit-as-throw': 'warn',
  'n/shebang': 'warn'
}
