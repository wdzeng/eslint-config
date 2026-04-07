import { defineConfig } from 'eslint/config'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint/config').Config[]} */
export default defineConfig(prettierRecommended, {
  rules: {
    'curly': ['warn', 'all'],
    'no-tabs': ['warn', { allowIndentationTabs: false }],
    'quotes': ['warn', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
    'prettier/prettier': 'warn' // This must be put at the end
  }
})
