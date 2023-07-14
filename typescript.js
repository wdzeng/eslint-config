const importOverrides = require('./presets/import-overrides.js')
const recommendedOverrides = require('./presets/recommended-overrides.js')
const typescriptOverrides = require('./presets/typescript-overrides.js')
const unicornSelections = require('./presets/unicorn-selections.js')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['unicorn', 'import', '@typescript-eslint'],
  rules: Object.assign(
    recommendedOverrides,
    typescriptOverrides,
    unicornSelections,
    importOverrides
  ),
  settings: {
    // https://github.com/import-js/eslint-plugin-import/tree/main#typescript
    'import/resolver': {
      node: true,
      typescript: true
    }
  }
}
