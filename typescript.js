const importOverrides = require('./presets/import-overrides.js')
const nSelections = require('./presets/n-selections.js')
const prettierOverrides = require('./presets/prettier-overrides.js')
const recommendedOverrides = require('./presets/recommended-overrides.js')
const typescriptOverrides = require('./presets/typescript-overrides.js')
const unicornSelections = require('./presets/unicorn-selections.js')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['n', 'unicorn', 'import', '@typescript-eslint', 'prettier'],
  rules: Object.assign(
    {},
    recommendedOverrides,
    nSelections,
    typescriptOverrides,
    unicornSelections,
    importOverrides,
    prettierOverrides
  ),
  settings: {
    // https://github.com/import-js/eslint-plugin-import/tree/main#typescript
    'import/resolver': {
      node: true,
      typescript: true
    }
  }
}
