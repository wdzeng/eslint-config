// Hint: we cannot write this file in TypeScript because eslint-plugin-import is not typed as of
// v2.31.

import eslint from '@eslint/js'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginN from 'eslint-plugin-n'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

import importRecommendedRulesOverrides from './presets/import-overrides.mjs'
import nSelections from './presets/n-selections.mjs'
import prettierRecommendedRulesOverrides from './presets/prettier-overrides.mjs'
import eslintRecommendedRulesOverrides from './presets/recommended-overrides.mjs'
import tsRecommendedRulesOverrides from './presets/typescript-overrides.mjs'
import unicornSelections from './presets/unicorn-selections.mjs'

const flatConfigsBeforeTs = [
  // ESLint built-ins
  eslint.configs.recommended,
  { rules: eslintRecommendedRulesOverrides },
  // The n plugin
  { plugins: { n: eslintPluginN }, rules: nSelections }
]

const flatConfigsForTs = tsEslint.config({
  extends: [...tsEslint.configs.strict, ...tsEslint.configs.stylistic],
  languageOptions: {
    parserOptions: {
      // https://typescript-eslint.io/getting-started/typed-linting/
      projectService: true,
      tsconfigRootDir: import.meta.dirname
    }
  },
  rules: tsRecommendedRulesOverrides,
  // The `settings` is an object containing name-value pairs of information that should be
  // available to all rules. Act as labels. Add a `ts-only` label so that users can do custom
  // settings on theses rules.
  //
  // https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects
  settings: { tsOnly: true }
})

const flatConfigsAfterTs = [
  // Unicorn
  { plugins: { unicorn: eslintPluginUnicorn }, rules: unicornSelections },
  // Import
  // https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#config---flat-eslintconfigjs
  eslintPluginImport.flatConfigs.recommended,
  { rules: importRecommendedRulesOverrides },
  // Prettier
  // https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
  eslintPluginPrettierRecommended,
  { rules: prettierRecommendedRulesOverrides }
]

const defaultJsOptions = {
  browser: false,
  ecmaVersion: 2022,
  ignores: undefined,
  node: false
}

function getConfig(extended, options) {
  options = { ...defaultJsOptions, ...options }

  const languageOptions = { sourceType: 'module', globals: {} }
  languageOptions.ecmaVersion = options.ecmaVersion
  if (options.node) {
    Object.assign(languageOptions.globals, globals.node)
  }
  if (options.browser) {
    Object.assign(languageOptions.globals, globals.browser)
  }

  // We use the helper function `tsEslint.config` so that we can add the `languageOptions` to all
  // extended rules. Note that this helper function is nothing related to TypeScript, though it
  // comes from the typescript-eslint package. See
  // https://eslint.org/docs/latest/use/configure/combine-configs and
  // https://typescript-eslint.io/packages/typescript-eslint#flat-config-extends.
  const config = {
    extends: extended,
    languageOptions
  }
  if (options.ignores) {
    config.ignores = options.ignores
  }
  return tsEslint.config(config)
}

export function getConfigForJs(customRules, options) {
  const rules = [
    ...flatConfigsBeforeTs,
    ...flatConfigsAfterTs,
    customRules ?? {},
    { rules: { 'prettier/prettier': 'warn' } }
  ]

  return getConfig(rules, options)
}

export function getConfigForTs(customRules, options) {
  const rules = [
    ...flatConfigsBeforeTs,
    ...flatConfigsForTs,
    ...flatConfigsAfterTs,
    customRules ?? {},
    { rules: { 'prettier/prettier': 'warn' } }
  ]

  return getConfig(rules, options)
}
