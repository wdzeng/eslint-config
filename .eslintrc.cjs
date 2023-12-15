/* eslint-disable sort-keys */

const path = require('node:path')

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
    sourceType: 'module'
  },
  rules: {
    'unicorn/prefer-module': 'off',
    'prettier/prettier': 'warn'
  },
  overrides: [
    {
      files: ['tests/ts/in/**/*.ts'],
      extends: ['./typescript'],
      env: {
        browser: false,
        es2022: true,
        node: true
      },
      parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
        project: path.join(__dirname, 'tests/ts/tsconfig.test.json')
      },
      rules: {
        'prettier/prettier': 'warn'
      }
    },
    {
      files: ['**/*.mjs'],
      parserOptions: {
        sourceType: 'module'
      }
    }
  ]
}
