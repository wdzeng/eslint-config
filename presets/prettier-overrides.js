// These rules override plugin:prettier/prettier. See
// https://github.com/prettier/eslint-config-prettier#special-rules for rules that should be
// overridden.

module.exports = {
  'curly': ['warn', 'all'],
  'no-tabs': ['warn', { allowIndentationTabs: false }]
}
