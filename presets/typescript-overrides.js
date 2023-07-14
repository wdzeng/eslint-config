// These rules override plugin:@typescript-eslint/strict-type-checked and
// plugin:@typescript-eslint/stylistic-type-checked.

/* eslint-disable sort-keys */

module.exports = {
  // JavaScript no-shadow rule doesn't work with TypeScript.
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'error',
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': 'warn'
}
