/* eslint-disable sort-keys */

const path = require('node:path')

module.exports = {
  root: true,
  extends: ['../../typescript'],
  env: {
    browser: false,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    project: path.join(__dirname, 'tsconfig.test.json')
  },
  rules: {
    'prettier/prettier': 'warn'
  }
}
