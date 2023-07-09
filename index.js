const basicRules = {
  'capitalized-comments': 'warn',
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
  'no-return-await': 'warn',
  'no-sequences': 'warn',
  'no-shadow': 'error',
  'no-tabs': 'warn',
  'no-throw-literal': 'warn',
  'no-unused-expressions': 'warn',
  'no-unused-vars': 'warn',
  'no-useless-call': 'warn',
  'no-useless-return': 'warn',
  'no-var': 'warn',
  'no-void': 'warn',
  'prefer-const': 'warn',
  'prefer-promise-reject-errors': 'warn',
  'prefer-template': 'warn',
  'require-await': 'warn',
  'sort-keys': ['warn', 'asc', { caseSensitive: true, natural: true }],
  'spaced-comment': 'warn'
}

const unicornRules = {
  'unicorn/consistent-function-scoping': 'warn',
  'unicorn/new-for-builtins': 'warn',
  'unicorn/no-array-method-this-argument': 'error',
  'unicorn/no-await-expression-member': 'warn',
  'unicorn/no-console-spaces': 'warn',
  'unicorn/no-empty-file': 'warn',
  'unicorn/no-for-loop': 'warn',
  'unicorn/no-instanceof-array': 'warn',
  'unicorn/no-lonely-if': 'warn',
  'unicorn/no-negated-condition': 'warn',
  'unicorn/no-nested-ternary': 'warn',
  'unicorn/no-new-array': 'warn',
  'unicorn/no-new-buffer': 'warn',
  'unicorn/no-null': 'warn',
  'unicorn/no-object-as-default-parameter': 'error',
  'unicorn/no-process-exit': 'warn',
  'unicorn/no-static-only-class': 'warn',
  'unicorn/no-thenable': 'error',
  'unicorn/no-this-assignment': 'error',
  'unicorn/no-typeof-undefined': 'warn',
  'unicorn/no-unnecessary-await': 'error',
  'unicorn/no-useless-length-check': 'warn',
  'unicorn/no-useless-promise-resolve-reject': 'warn',
  'unicorn/no-useless-switch-case': 'warn',
  'unicorn/number-literal-case': 'warn',
  'unicorn/prefer-array-find': 'warn',
  'unicorn/prefer-array-flat': 'warn',
  'unicorn/prefer-array-flat-map': 'warn',
  'unicorn/prefer-array-index-of': 'warn',
  'unicorn/prefer-array-some': 'warn',
  'unicorn/prefer-at': 'warn',
  'unicorn/prefer-blob-reading-methods': 'warn',
  'unicorn/prefer-code-point': 'error',
  'unicorn/prefer-date-now': 'warn',
  'unicorn/prefer-includes': 'warn',
  'unicorn/prefer-json-parse-buffer': 'warn',
  'unicorn/prefer-logical-operator-over-ternary': 'warn',
  'unicorn/prefer-math-trunc': 'warn',
  'unicorn/prefer-modern-math-apis': 'warn',
  'unicorn/prefer-module': 'error',
  'unicorn/prefer-native-coercion-functions': 'warn',
  'unicorn/prefer-negative-index': 'warn',
  'unicorn/prefer-node-protocol': 'error',
  'unicorn/prefer-number-properties': 'error',
  'unicorn/prefer-object-from-entries': 'warn',
  'unicorn/prefer-optional-catch-binding': 'warn',
  'unicorn/prefer-prototype-methods': 'warn',
  'unicorn/prefer-reflect-apply': 'warn',
  'unicorn/prefer-regexp-test': 'warn',
  'unicorn/prefer-set-has': 'warn',
  'unicorn/prefer-set-size': 'warn',
  'unicorn/prefer-spread': 'warn',
  'unicorn/prefer-string-replace-all': 'error',
  'unicorn/prefer-string-slice': 'warn',
  'unicorn/prefer-string-starts-ends-with': 'warn',
  'unicorn/prefer-string-trim-start-end': 'warn',
  'unicorn/prefer-switch': 'warn',
  'unicorn/prefer-ternary': 'warn',
  'unicorn/prefer-top-level-await': 'warn',
  'unicorn/prefer-type-error': 'warn',
  'unicorn/switch-case-braces': 'warn',
  'unicorn/text-encoding-identifier-case': 'warn',
  'unicorn/throw-new-error': 'warn'
}

const importRules = {
  'import/first': 'warn',
  'import/newline-after-import': ['warn', { considerComments: false, count: 1 }],
  'import/order': [
    'warn',
    {
      'alphabetize': {
        caseInsensitive: false,
        order: 'asc',
        orderImportKind: 'asc'
      },
      'groups': [
        'builtin',
        'external',
        ['internal', 'parent', 'sibling', 'index'],
        ['object', 'type']
      ],
      'newlines-between': 'always',
      'pathGroups': [{ group: 'internal', pattern: '@/**' }]
    }
  ],
  'sort-imports': [
    'warn',
    {
      ignoreCase: false,
      ignoreDeclarationSort: true, // This is handled by import/order.
      ignoreMemberSort: false
    }
  ]
}

module.exports = {
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  plugins: ['unicorn', 'import'],
  rules: Object.assign(basicRules, unicornRules, importRules)
}
