const importOverrides = require('./presets/import-overrides.js')
const recommendedOverrides = require('./presets/recommended-overrides.js')
const unicornSelections = require('./presets/unicorn-selections.js')

module.exports = {
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  plugins: ['unicorn', 'import'],
  rules: Object.assign(recommendedOverrides, unicornSelections, importOverrides)
}
