// These rules override plugin:@typescript-eslint/strict-type-checked and
// plugin:@typescript-eslint/stylistic-type-checked.

/* eslint-disable sort-keys */

export default {
  // Rules in eslint that conflict with typescript-eslint.
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
  '@typescript-eslint/no-shadow': 'warn',
  'no-unused-expressions': 'off',
  '@typescript-eslint/no-unused-expressions': 'warn',
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': 'warn',
  'dot-notation': 'off',
  '@typescript-eslint/dot-notation': 'warn',
  'require-await': 'off',
  '@typescript-eslint/require-await': 'warn',

  // Mark no-unnecessary-* rules to warning level.
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
  '@typescript-eslint/no-unnecessary-condition': 'warn',
  '@typescript-eslint/no-unnecessary-qualifier': 'warn',
  '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
  '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
  '@typescript-eslint/no-unnecessary-type-constraint': 'warn',

  // Other customizations.
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/no-confusing-void-expression': ['warn', { ignoreArrowShorthand: true }],
  '@typescript-eslint/no-import-type-side-effects': 'warn',
  '@typescript-eslint/restrict-template-expressions': [
    'warn',
    { allowBoolean: true, allowNumber: true }
  ]
}
