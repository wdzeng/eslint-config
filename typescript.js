const typescriptOverrides = require('./presets/typescript-overrides.js')

module.exports = {
  extends: [
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: Object.assign(typescriptOverrides),
  settings: {
    // https://github.com/import-js/eslint-plugin-import/tree/main#typescript
    'import/resolver': {
      node: true,
      typescript: true
    }
  }
}
