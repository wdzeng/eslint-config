/* eslint-env node */

const { rules } = require('./index.js')
const { rules: tsRules } = require('./typescript.js')

const overriddenRules = {
  'unicorn/prefer-module': 'off',
  'prettier/prettier': 'warn'
}

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  plugins: ['unicorn', 'import', 'prettier'],
  env: {
    browser: false,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'commonjs',
    project: './tsconfig.json'
  },
  rules: Object.assign({}, rules, overriddenRules),

  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended'
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['unicorn', 'import', '@typescript-eslint', 'prettier'],
      rules: Object.assign({}, tsRules, overriddenRules),
      settings: {
        // https://github.com/import-js/eslint-plugin-import/tree/main#typescript
        'import/resolver': {
          node: true,
          typescript: true
        }
      }
    }
  ]
}
