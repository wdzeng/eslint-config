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
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    'unicorn/prefer-module': 'off',
    'prettier/prettier': 'warn'
  }
}
