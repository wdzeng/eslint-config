// Hint: we cannot write this file in TypeScript because eslint-plugin-import is not typed as of
// v2.31.

import fs from 'node:fs'
import path from 'node:path'

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

const FLAT_CONFIGS_BEFORE_TS = [
  // ESLint built-ins
  eslint.configs.recommended,
  { rules: eslintRecommendedRulesOverrides },
  // The n plugin
  { plugins: { n: eslintPluginN }, rules: nSelections }
]

function getFlatConfigsForTs(tsconfigRootDir) {
  return tsEslint.config({
    extends: [...tsEslint.configs.strict, ...tsEslint.configs.stylistic],
    languageOptions: {
      parserOptions: {
        // https://typescript-eslint.io/getting-started/typed-linting/
        projectService: true,
        tsconfigRootDir
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
}

const FLAT_CONFIGS_AFTER_TS = [
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

function getFlatConfigForConfigFilesInTsProject(tsconfigRootDir) {
  return {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir,
        projectService: {
          allowDefaultProject: [
            // Can match eslint, prettier, jest, ava, vitest, webpack, and etc. These also match
            // files under sub-directories.
            '*.config.{js,cjs,mjs,ts,cts,mts}',
            '.*rc.{js,cjs,mjs,ts,cts,mts}'
          ]
        }
      }
    }
  }
}

function getFlatConfigsAtEnd(projectRoot) {
  const ret = []

  // Enable n/no-unpublished-import in production files only. If the project has a "src" directory
  // at the root, we believe files under that are production files. Otherwise, we exclude test and
  // configuration files only.
  if (fs.existsSync(path.join(projectRoot, 'tsconfig.json'))) {
    ret.push({
      files: ['src/**/*.{js,cjs,mjs,ts,cts,mts}'],
      rules: { 'n/no-unpublished-import': ['error', { ignoreTypeImport: true }] }
    })
  } else {
    ret.push(
      { rules: { 'n/no-unpublished-import': ['error', { ignoreTypeImport: true }] } },
      {
        files: [
          'test/**/*.{js,cjs,mjs,ts,cts,mts}',
          'tests/**/*.{js,cjs,mjs,ts,cts,mts}',
          '**/*.test.{js,cjs,mjs,ts,cts,mts}',
          '*.config.{js,cjs,mjs,ts,cts,mts}',
          '.*rc.{js,cjs,mjs,ts,cts,mts}'
        ],
        rules: { 'n/no-unpublished-import': 'off' }
      }
    )
  }

  // Let ESLint work with prettier.
  ret.push({
    rules: { 'prettier/prettier': 'warn' }
  })

  return ret
}

const DEFAULT_OPTIONS = {
  browser: false,
  ecmaVersion: 2022,
  ignores: undefined,
  node: false
}

function getConfig(extended, options) {
  options = { ...DEFAULT_OPTIONS, ...options }

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

function requireValidOptions(options) {
  const allowedKeys = new Set(['browser', 'ecmaVersion', 'ignores', 'node', 'projectRoot'])
  const unknownKeys = []
  for (const [k, v] of Object.entries(options)) {
    if (!allowedKeys.has(k) && v !== undefined) {
      unknownKeys.push(k)
    }
  }
  if (unknownKeys.length > 0) {
    throw new TypeError(`Unknown options: ${unknownKeys.join(', ')}`)
  }

  const requiredKeys = ['projectRoot']
  const missingKeys = []
  for (const k of requiredKeys) {
    if (!(k in options) || options[k] === undefined) {
      missingKeys.push(k)
    }
  }
  if (missingKeys.length > 0) {
    throw new TypeError(`Missing required options: ${missingKeys.join(', ')}`)
  }
}

export function getConfigForJs(customRules, options) {
  requireValidOptions(options)

  const rules = [
    ...FLAT_CONFIGS_BEFORE_TS,
    ...FLAT_CONFIGS_AFTER_TS,
    customRules ?? {},
    ...getFlatConfigsAtEnd(options.projectRoot)
  ]

  return getConfig(rules, options)
}

export function getConfigForTs(customRules, options) {
  requireValidOptions(options)
  if (!options.projectRoot) {
    throw new TypeError('The `projectRoot` option is required.')
  }

  const rules = [
    ...FLAT_CONFIGS_BEFORE_TS,
    ...getFlatConfigsForTs(options.projectRoot),
    ...FLAT_CONFIGS_AFTER_TS,
    getFlatConfigForConfigFilesInTsProject(options.projectRoot),
    customRules ?? {},
    ...getFlatConfigsAtEnd(options.projectRoot)
  ]

  return getConfig(rules, options)
}
