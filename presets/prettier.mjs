// @ts-check

import prettierRecommended from 'eslint-plugin-prettier/recommended'
import tsEslint from 'typescript-eslint'

/** @type {import('typescript-eslint').ConfigArray} */
const configs = tsEslint.config({
  extends: [prettierRecommended],
  rules: {
    'curly': ['warn', 'all'],
    'no-tabs': ['warn', { allowIndentationTabs: false }],
    'quotes': ['warn', 'single', { allowTemplateLiterals: false, avoidEscape: true }],

    // This must be put at the end
    'prettier/prettier': 'warn'
  }
})

export default configs
