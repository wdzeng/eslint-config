// @ts-check

// Hint: we cannot write this file in TypeScript because eslint-plugin-import is not typed as of
// v2.31.

import fs from 'node:fs'
import path from 'node:path'

import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

import { getJsConfigs, getTsConfigs } from './presets/builtin.mjs'
import {
  getJsConfig as getImportXJsConfig,
  getTsConfig as getImportXTsConfig
} from './presets/import-x.mjs'
import { getJsConfig as getNJsConfig, getTsConfig as getNTsConfig } from './presets/n.mjs'
import prettierConfigs from './presets/prettier.mjs'
import unicornConfig from './presets/unicorn.mjs'

/**
 * @typedef Options
 * @prop {string} projectRoot The root directory of the project
 * @prop {import('eslint').Linter.EcmaVersion} [ecmaVersion] The ECMAScript version to lint for
 * @prop {string[]} [ignores] Glob patterns to ignore
 * @prop {boolean} [node] Whether the runtime is Node.js
 * @prop {boolean} [browser] Whether the runtime is a browser
 */

/** @type {Required<Omit<Options, 'projectRoot'>>} */
const DEFAULT_OPTIONS = {
  browser: false,
  ecmaVersion: 2022,
  ignores: ['out/**', 'dist/**', 'build/**', 'coverage/**'],
  node: true
}

/**
 * Ensures the options object is valid.
 * @param {object} options the options object
 * @returns {asserts options is Options}
 */
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

/**
 * Gets the ESLint config for non-production files.
 * @param {string} projectRoot the root directory of the project
 * @returns {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config} the config object
 */
function getNonProductionFilesConfig(projectRoot) {
  // Enable n/no-unpublished-import in production files only. If the project has a "src" directory
  // at the root, we believe files under that are production files. Otherwise, we exclude test and
  // configuration files only.
  if (fs.existsSync(path.join(projectRoot, 'src'))) {
    return {
      name: 'non-production-files',
      files: [
        // Test files everywhere
        '**/*.test.{js,cjs,mjs,ts,cts,mts}',
        // Config files at the project root directory
        '*.config.{js,cjs,mjs,ts,cts,mts}',
        '.*rc.{js,cjs,mjs,ts,cts,mts}'
      ],
      rules: { 'n/no-unpublished-import': 'off' }
    }
  }

  return {
    name: 'non-production-files',
    files: [
      // Test files everywhere
      'test/**/*.{js,cjs,mjs,ts,cts,mts}',
      'tests/**/*.{js,cjs,mjs,ts,cts,mts}',
      '**/*.test.{js,cjs,mjs,ts,cts,mts}',
      // Config files at the project root directory
      '*.config.{js,cjs,mjs,ts,cts,mts}',
      '.*rc.{js,cjs,mjs,ts,cts,mts}'
    ],
    rules: { 'n/no-unpublished-import': 'off' }
  }
}

/**
 * Gets the ESLint configuration for JavaScript project.
 * @param {import('eslint').Linter.RulesRecord | undefined} userRules user's custom rules
 * @param {Options} options lint options
 * @returns {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile}
 */
export function getConfigForJs(userRules, options) {
  requireValidOptions(options)
  const lintOptions = { ...DEFAULT_OPTIONS, ...options }

  /** @type {import('eslint').Linter.LanguageOptions & { globals: {} }} */
  const languageOptions = {
    globals: {},
    parserOptions: { ecmaVersion: lintOptions.ecmaVersion },
    sourceType: 'module'
  }
  if (lintOptions.node) {
    Object.assign(languageOptions.globals, globals.node)
  }
  if (lintOptions.browser) {
    Object.assign(languageOptions.globals, globals.browser)
  }

  const globalIgnoresConfig = options.ignores ? globalIgnores(options.ignores) : {}
  const languageOptionsConfig = { languageOptions }
  const eslintBuiltinConfigs = getJsConfigs()
  const nConfig = getNJsConfig()
  const importXConfig = getImportXJsConfig()
  const userCustomConfig = userRules ? { rules: userRules } : {}
  const nonProductionFilesConfig = getNonProductionFilesConfig(lintOptions.projectRoot)

  // https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects
  return tsEslint.config(
    globalIgnoresConfig,
    languageOptionsConfig,
    eslintBuiltinConfigs,
    nConfig,
    unicornConfig,
    importXConfig,
    userCustomConfig,
    nonProductionFilesConfig,
    prettierConfigs
  )
}

/**
 * Gets the ESLint configuration for the TypeScript project.
 * @param {import('eslint').Linter.RulesRecord | undefined} userRules user's custom rules
 * @param {Options} options lint options
 * @returns {import('typescript-eslint').ConfigArray}
 */
export function getConfigForTs(userRules, options) {
  requireValidOptions(options)
  options = { ...DEFAULT_OPTIONS, ...options }

  /** @type {import('eslint').Linter.LanguageOptions & { globals: {} }} */
  const languageOptions = {
    globals: {},
    parserOptions: {
      ecmaVersion: options.ecmaVersion,
      tsconfigRootDir: options.projectRoot,
      projectService: {
        // Use allowDefaultProject so that it does not give false errors for JS files.
        allowDefaultProject: ['*.js', '*.mjs', '*.cjs']
      }
    },
    sourceType: 'module'
  }
  if (options.node) {
    Object.assign(languageOptions.globals, globals.node)
  }
  if (options.browser) {
    Object.assign(languageOptions.globals, globals.browser)
  }

  const globalIgnoresConfig = options.ignores ? globalIgnores(options.ignores) : {}
  const languageOptionsConfig = { languageOptions }
  const eslintBuiltinsAndTsConfig = getTsConfigs()
  const nConfig = getNTsConfig()
  const importXConfig = getImportXTsConfig(options.projectRoot)
  const userCustomConfig = userRules ? { rules: userRules } : {}
  const nonProductionFilesConfig = getNonProductionFilesConfig(options.projectRoot)

  // https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects
  return tsEslint.config(
    globalIgnoresConfig,
    languageOptionsConfig,
    eslintBuiltinsAndTsConfig,
    nConfig,
    unicornConfig,
    importXConfig,
    userCustomConfig,
    nonProductionFilesConfig,
    prettierConfigs
  )
}
