// These rules override eslint:recommended. See https://eslint.org/docs/latest/rules/ for all rules
// in that preset.

export default {
  // Styles.
  'capitalized-comments': [
    'warn',
    'always',
    { ignoreConsecutiveComments: true, ignorePattern: 'cspell:' }
  ],
  'curly': ['warn', 'all'],
  'dot-notation': 'warn',
  'linebreak-style': ['error', 'unix'],
  'no-else-return': ['warn', { allowElseIf: false }],
  'no-negated-condition': 'warn',
  'no-tabs': 'warn',
  'quote-props': ['warn', 'consistent-as-needed'],
  'sort-keys': [
    'warn',
    'asc',
    { allowLineSeparatedGroups: true, caseSensitive: true, minKeys: 4, natural: true }
  ],
  'spaced-comment': 'warn',

  // Error-related.
  'no-throw-literal': 'warn',

  // Variable declaration-related.
  'no-sequences': 'warn',
  'no-shadow': 'error',
  // Allow unused arguments that start with underscore. This is useful for overriding functions or
  // implementing event listeners. However, tsc still complain this unless the argument name has
  // prefixed with underscore; therefore align the ESLint rule with tsc.
  'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  'no-use-before-define': ['error', { allowNamedExports: true }],
  'no-var': 'warn',
  'prefer-const': 'warn',

  // Promise-related.
  'no-void': ['warn', { allowAsStatement: true }], // Allow to fire and forget promises
  'prefer-promise-reject-errors': 'warn',
  'require-await': 'warn',

  // Array-related.
  'no-array-constructor': 'warn',

  // Import/export-related.
  'no-duplicate-imports': 'warn',

  // Others.
  'consistent-return': 'warn',
  'default-case-last': 'error',
  'default-param-last': 'error',
  'eqeqeq': 'warn',
  'no-empty-function': 'warn',
  'no-empty-static-block': 'warn',
  'no-invalid-this': 'error',
  'no-iterator': 'warn',
  'no-lone-blocks': 'warn',
  'no-lonely-if': 'warn',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-object': 'warn',
  'no-new-wrappers': 'warn',
  'no-self-compare': 'warn',
  'no-unreachable-loop': 'warn',
  'no-unused-expressions': ['warn', { allowShortCircuit: true, allowTernary: true }],
  'no-unused-private-class-members': 'warn',
  'no-useless-call': 'warn',
  'no-useless-rename': 'warn',
  'no-useless-return': 'warn',
  'prefer-template': 'warn'
}
