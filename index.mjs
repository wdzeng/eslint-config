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


const DEFAULT_OPTIONS = {
  browser: false,
  ecmaVersion: 2022,
  ignores: ['out/**', 'dist/**', 'build/**', 'coverage/**'],
  node: true
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

function getConfigForNonProductionFiles(projectRoot) {
  // Enable n/no-unpublished-import in production files only. If the project has a "src" directory
  // at the root, we believe files under that are production files. Otherwise, we exclude test and
  // configuration files only.
  if (fs.existsSync(path.join(projectRoot, 'src'))) {
    return {
      name: 'non-production-files',
      files: ['src/**/*.{js,cjs,mjs,ts,cts,mts}'],
      rules: {
        'n/no-unpublished-import': ['error', { ignoreTypeImport: true }]
      }
    }
  }

  return {
    name: 'non-production-files',
    ignores: [
      // test files
      'test/**/*.{js,cjs,mjs,ts,cts,mts}',
      'tests/**/*.{js,cjs,mjs,ts,cts,mts}',
      '**/*.test.{js,cjs,mjs,ts,cts,mts}',
      // config files
      '*.config.{js,cjs,mjs,ts,cts,mts}',
      '.*rc.{js,cjs,mjs,ts,cts,mts}'
    ],
    rules: { 'n/no-unpublished-import': ['error', { ignoreTypeImport: true }] }
  }
}

export function getConfigForJs(userRules, options) {
  requireValidOptions(options)
  options = { ...DEFAULT_OPTIONS, ...options }

  const languageOptions = {
    globals: {},
    parserOptions:{
      ecmaVersion: options.ecmaVersion,
    },
    sourceType: 'module',
  }
  if (options.node) {
    Object.assign(languageOptions.globals, globals.node)
  }
  if (options.browser) {
    Object.assign(languageOptions.globals, globals.browser)
  }

  // https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects
  return [
    // Ignores
    {
      name: 'ignores',
      ignores: options.ignores
    },
    // Language options
    {
      name: 'language-options',
      languageOptions
    },
    // ESLint built-ins
    ...tsEslint.config({
      extends: [eslint.configs.recommended],
      rules: eslintRecommendedRulesOverrides
    }),
    // The n plugin
    { plugins: { n: eslintPluginN }, rules: nSelections },
    // Unicorn
    { plugins: { unicorn: eslintPluginUnicorn }, rules: unicornSelections },
    // Import
    ...tsEslint.config({
      extends: [eslintPluginImport.flatConfigs.recommended],
      rules: importRecommendedRulesOverrides,
    }),
    // Prettier
    ...tsEslint.config({
      extends: [eslintPluginPrettierRecommended],
      rules: prettierRecommendedRulesOverrides ,
    }),
    // User's custom rules
    {
      name: 'user-rules',
      rules: userRules ?? {}
    },
    // Non-production files
    getConfigForNonProductionFiles(options.projectRoot),
    // Put warning prettier errors ar the end
    {
      name: 'prettier-warnings',
      rules: { 'prettier/prettier': 'warn' }
    }
  ]
}

export function getConfigForTs(userRules, options) {
  requireValidOptions(options)
  options = { ...DEFAULT_OPTIONS, ...options }

  const languageOptions = {
    globals: {},
    parserOptions: {
      ecmaVersion: options.ecmaVersion,
      tsconfigRootDir: options.projectRoot,
      projectService: true
    },
    sourceType: 'module',
  }
  if (options.node) {
    Object.assign(languageOptions.globals, globals.node)
  }
  if (options.browser) {
    Object.assign(languageOptions.globals, globals.browser)
  }

  // https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects
  return [
    // Ignores
    {
      name: 'ignores',
      ignores: options.ignores
    },
    // Language options
    {
      name: 'language-options',
      languageOptions
    },
    // ESLint built-ins and TypeScript
    ...tsEslint.config({
      extends: [
        tsEslint.configs.eslintRecommended,
        ...tsEslint.configs.strictTypeChecked,
        ...tsEslint.configs.stylisticTypeChecked
      ],
      rules: Object.assign(
        {},
        eslintRecommendedRulesOverrides,
        tsRecommendedRulesOverrides,
      )
    }),
    // The n plugin
    { plugins: { n: eslintPluginN }, rules: nSelections },
    // Unicorn
    { plugins: { unicorn: eslintPluginUnicorn }, rules: unicornSelections },
    // Import
    ...tsEslint.config({
      extends: [eslintPluginImport.flatConfigs.recommended],
      rules: importRecommendedRulesOverrides,
    }),
    // Prettier
    ...tsEslint.config({
      extends: [eslintPluginPrettierRecommended],
      rules: prettierRecommendedRulesOverrides,
    }),
    // User's custom rules
    {
      name: 'user-rules',
      rules: userRules ?? {}
    },
    // Non-production files
    getConfigForNonProductionFiles(options.projectRoot),
    // Put warning prettier errors ar the end
    {
      name: 'prettier-warnings',
      rules: { 'prettier/prettier': 'warn' }
    }
  ]
}
