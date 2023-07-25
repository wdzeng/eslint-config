/* eslint-disable sort-keys */

module.exports = {
  root: true,
  extends: ['./index'],
  env: {
    browser: false,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'script'
  },
  rules: {
    'unicorn/prefer-module': 'off',
    'prettier/prettier': 'warn'
  },
  overrides: [
    {
      files: ['**/*.mjs'],
      parserOptions: {
        sourceType: 'module'
      }
    }
  ]
}
