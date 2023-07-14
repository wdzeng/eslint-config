const importOverrides = require('./presets/import-overrides.js')
const prettierOverrides = require('./presets/prettier-overrides.js')
const recommendedOverrides = require('./presets/recommended-overrides.js')
const unicornSelections = require('./presets/unicorn-selections.js')

module.exports = {
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  plugins: ['unicorn', 'import', 'prettier'],
  rules: Object.assign(
    {},
    recommendedOverrides,
    unicornSelections,
    importOverrides,
    prettierOverrides
  )
}
