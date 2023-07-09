/* eslint-env node */

const { rules } = require('./index.cjs')

const overriddenRules = {
  'unicorn/prefer-module': 'off',
  'prettier/prettier': 'warn'
}

module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended'],
  plugins: ['unicorn'],
  env: {
    browser: false,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'commonjs'
  },
  rules: Object.assign(rules, overriddenRules)
}
