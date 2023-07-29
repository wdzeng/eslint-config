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

  // These two rules do not handle path aliases, so disable.
  'n/no-missing-require': 'off',
  'n/no-missing-import': 'off'
}
