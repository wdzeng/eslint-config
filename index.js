const importOverrides = require('./presets/import-overrides.js')
const nSelections = require('./presets/n-selections.js')
const prettierOverrides = require('./presets/prettier-overrides.js')
const recommendedOverrides = require('./presets/recommended-overrides.js')
const unicornSelections = require('./presets/unicorn-selections.js')

module.exports = {
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  plugins: ['n', 'unicorn', 'import', 'prettier'],
  rules: Object.assign(
    {},
    recommendedOverrides,
    nSelections,
    unicornSelections,
    importOverrides,
    prettierOverrides
  )
}
