// These rules override plugin:prettier/prettier. See
// https://github.com/prettier/eslint-config-prettier#special-rules for rules that should be
// overridden.

export default {
  'curly': ['warn', 'all'],
  'no-tabs': ['warn', { allowIndentationTabs: false }],
  'quotes': ['warn', 'single', { allowTemplateLiterals: false, avoidEscape: true }]
}
