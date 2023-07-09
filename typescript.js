const typescriptRules = {
  '@typescript-eslint/no-implicit-any-catch': 'warn'
}

module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: typescriptRules
}
