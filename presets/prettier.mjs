import prettierRecommended from 'eslint-plugin-prettier/recommended'
import tsEslint from 'typescript-eslint'

/** @type {import('typescript-eslint').ConfigArray} */
export default tsEslint.config(prettierRecommended, {
  rules: {
    'curly': ['warn', 'all'],
    'no-tabs': ['warn', { allowIndentationTabs: false }],
    'quotes': ['warn', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
    'prettier/prettier': 'warn' // This must be put at the end
  }
})
