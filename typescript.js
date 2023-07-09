const typescriptRules = {
  '@typescript-eslint/no-implicit-any-catch': 'warn'
}

module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: typescriptRules,
  settings: {
    // https://github.com/import-js/eslint-plugin-import/tree/main#typescript
    'import/resolver': {
      node: true,
      typescript: true
    }
  }
}
