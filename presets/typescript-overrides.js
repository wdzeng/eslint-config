// These rules override plugin:@typescript-eslint/strict-type-checked and
// plugin:@typescript-eslint/stylistic-type-checked.

/* eslint-disable sort-keys */

const jsRules = require('./recommended-overrides')

module.exports = {
  // Rules in eslint:recommended that conflict with @typescript-eslint/no-shadow.
  'no-empty-function': 'off',
  '@typescript-eslint/no-empty-function': [
    'warn',
    {
      allow: [
        'private-constructors',
        'protected-constructors',
        'overrideMethods',
        'decoratedFunctions'
      ]
    }
  ],
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': jsRules['no-shadow'],
  'no-unused-expressions': 'off',
  '@typescript-eslint/no-unused-expressions': jsRules['no-unused-expressions'],
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': jsRules['no-unused-vars'],
  'dot-notation': 'off',
  '@typescript-eslint/dot-notation': jsRules['dot-notation'],
  'require-await': 'off',
  '@typescript-eslint/require-await': jsRules['require-await'],

  // These two rules do not handle path aliases, so disable.
  'n/no-missing-require': 'off',
  'n/no-missing-import': 'off',

  // Mark no-unnecessary-* rules to warning level.
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
  '@typescript-eslint/no-unnecessary-condition': 'warn',
  '@typescript-eslint/no-unnecessary-qualifier': 'warn',
  '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
  '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
  '@typescript-eslint/no-unnecessary-type-constraint': 'warn',

  // Other customizations.
  '@typescript-eslint/no-confusing-void-expression': ['warn', { ignoreArrowShorthand: true }],
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/no-import-type-side-effects': 'warn',
}
