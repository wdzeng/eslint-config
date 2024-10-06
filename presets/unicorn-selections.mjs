// See https://github.com/sindresorhus/eslint-plugin-unicorn#rules for rules.

export default {
  // Array-related.
  'unicorn/consistent-existence-index-check': 'warn',
  'unicorn/explicit-length-check': 'warn',
  'unicorn/no-array-for-each': 'warn',
  'unicorn/no-array-method-this-argument': 'error',
  'unicorn/no-array-push-push': 'warn',
  'unicorn/no-await-expression-member': 'warn',
  'unicorn/no-for-loop': 'warn',
  'unicorn/no-instanceof-array': 'warn',
  'unicorn/no-new-array': 'warn',
  'unicorn/no-useless-length-check': 'warn',
  'unicorn/no-useless-spread': 'warn',
  'unicorn/prefer-array-find': 'warn',
  'unicorn/prefer-array-flat': 'warn',
  'unicorn/prefer-array-flat-map': 'warn',
  'unicorn/prefer-array-index-of': 'warn',
  'unicorn/prefer-array-some': 'warn',
  'unicorn/prefer-at': 'warn',
  'unicorn/prefer-includes': 'warn',
  'unicorn/prefer-negative-index': 'warn',
  'unicorn/prefer-spread': 'warn',

  // String-related.
  'unicorn/prefer-code-point': 'error',
  'unicorn/prefer-string-replace-all': 'error',
  'unicorn/prefer-string-slice': 'warn',
  'unicorn/prefer-string-starts-ends-with': 'warn',
  'unicorn/prefer-string-trim-start-end': 'warn',

  // Error-related.
  'unicorn/prefer-optional-catch-binding': 'warn',
  'unicorn/prefer-type-error': 'warn',
  'unicorn/throw-new-error': 'warn',

  // Promise-related.
  'unicorn/no-await-in-promise-methods': 'warn',
  'unicorn/no-single-promise-in-promise-methods': 'warn',
  'unicorn/no-thenable': 'error',
  'unicorn/no-unnecessary-await': 'error',
  'unicorn/no-unnecessary-polyfills': 'warn',
  'unicorn/no-useless-promise-resolve-reject': 'warn',
  'unicorn/prefer-top-level-await': 'warn',

  // DOM-related.
  'unicorn/prefer-dom-node-append': 'warn',
  'unicorn/prefer-dom-node-dataset': 'warn',
  'unicorn/prefer-dom-node-remove': 'warn',
  'unicorn/prefer-dom-node-text-content': 'warn',
  'unicorn/prefer-event-target': 'warn',
  'unicorn/prefer-modern-dom-apis': 'warn',

  // Regex-related.
  'unicorn/better-regex': 'warn',
  'unicorn/prefer-regexp-test': 'warn',

  // Math-related
  'unicorn/prefer-math-min-max': 'warn',
  'unicorn/prefer-math-trunc': 'warn',
  'unicorn/prefer-modern-math-apis': 'warn',
  'unicorn/prefer-native-coercion-functions': 'warn',

  // Import/export-related.
  'unicorn/prefer-export-from': 'warn',
  'unicorn/prefer-module': 'error',
  'unicorn/prefer-node-protocol': 'warn',

  // Set-related.
  'unicorn/prefer-set-has': 'warn',
  'unicorn/prefer-set-size': 'warn',

  // Date-related.
  'unicorn/prefer-date-now': 'warn',

  // Styles.
  'unicorn/no-empty-file': 'warn',
  'unicorn/no-lonely-if': 'warn',
  'unicorn/no-negated-condition': 'warn',
  'unicorn/no-negation-in-equality-check': 'warn',
  'unicorn/no-nested-ternary': 'warn',
  'unicorn/prefer-logical-operator-over-ternary': 'warn',
  'unicorn/prefer-switch': 'warn',
  'unicorn/prefer-ternary': 'warn',
  'unicorn/switch-case-braces': ['warn', 'avoid'],

  // Others
  'unicorn/consistent-function-scoping': 'warn',
  'unicorn/new-for-builtins': 'warn',
  'unicorn/no-abusive-eslint-disable': 'warn',
  'unicorn/no-console-spaces': 'warn',
  'unicorn/no-invalid-fetch-options': 'warn',
  'unicorn/no-new-buffer': 'warn',
  'unicorn/no-null': 'warn',
  'unicorn/no-object-as-default-parameter': 'error',
  'unicorn/no-process-exit': 'warn',
  'unicorn/no-static-only-class': 'warn',
  'unicorn/no-this-assignment': 'error',
  'unicorn/no-typeof-undefined': 'warn',
  'unicorn/no-useless-switch-case': 'warn',
  'unicorn/number-literal-case': 'warn',
  'unicorn/prefer-blob-reading-methods': 'warn',
  'unicorn/prefer-json-parse-buffer': 'warn',
  'unicorn/prefer-keyboard-event-key': 'warn',
  'unicorn/prefer-number-properties': 'error',
  'unicorn/prefer-object-from-entries': 'warn',
  'unicorn/prefer-prototype-methods': 'warn',
  'unicorn/prefer-reflect-apply': 'warn',
  'unicorn/prefer-structured-clone': 'warn',
  'unicorn/text-encoding-identifier-case': 'warn'
}
