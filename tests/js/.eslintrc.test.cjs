/* eslint-disable sort-keys */

module.exports = {
  root: true,
  extends: ['../../index'],
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
    'prettier/prettier': 'warn'
  }
}
