// These rule overrides eslint:recommended. See https://eslint.org/docs/latest/rules/ for all rules
// in that preset.

module.exports = {
  'capitalized-comments': ['warn', 'always', { ignoreConsecutiveComments: true }],
  'consistent-return': 'warn',
  'curly': ['warn', 'all'],
  'default-case-last': 'error',
  'default-param-last': 'error',
  'dot-notation': 'warn',
  'linebreak-style': ['error', 'unix'],
  'no-array-constructor': 'warn',
  'no-else-return': 'warn',
  'no-empty-function': 'warn',
  'no-empty-static-block': 'warn',
  'no-invalid-this': 'error',
  'no-lone-blocks': 'warn',
  'no-lonely-if': 'warn',
  'no-negated-condition': 'warn',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-object': 'warn',
  'no-new-wrappers': 'warn',
  // Rule `no-return-await` is deprecated in ESLint v8.46.0; see
  // https://github.com/eslint/eslint/releases/tag/v8.46.0
  // 'no-return-await': 'warn',
  'no-sequences': 'warn',
  'no-shadow': 'error',
  'no-tabs': 'warn',
  'no-throw-literal': 'warn',
  'no-unused-expressions': ['warn', { allowShortCircuit: true, allowTernary: true }],
  // Allow unused arguments. This is useful for overriding functions or implementing event
  // listeners. However, tsc still complain this unless the argument name has prefixed with
  // underscore; therefore align the ESLint rule with tsc.
  'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  'no-useless-call': 'warn',
  'no-useless-return': 'warn',
  'no-var': 'warn',
  // Allow fire and forget promises.
  'no-void': ['warn', { allowAsStatement: true }],
  'prefer-const': 'warn',
  'prefer-promise-reject-errors': 'warn',
  'prefer-template': 'warn',
  'quote-props': ['warn', 'consistent-as-needed'],
  'require-await': 'warn',
  'sort-keys': [
    'warn',
    'asc',
    { allowLineSeparatedGroups: true, caseSensitive: true, minKeys: 4, natural: true }
  ],
  'spaced-comment': 'warn'
}
