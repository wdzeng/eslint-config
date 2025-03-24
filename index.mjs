// @ts-check

import fs from 'node:fs'
import path from 'node:path'

import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

import { getJsConfigs, getTsConfigs } from './presets/builtin.mjs'
import {
  getJsConfigs as getImportXJsConfigs,
  getTsConfigs as getImportXTsConfigs
} from './presets/import-x.mjs'
import { getJsConfigs as getNJsConfigs, getTsConfigs as getNTsConfigs } from './presets/n.mjs'
import { getConfigs as getPathAliasConfigs } from './presets/path-alias.mjs'
import prettierConfigs from './presets/prettier.mjs'
import { getConfigs as getUnicornConfigs } from './presets/unicorn.mjs'

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

function getNonProductionFilePaths(projectRoot) {
  // If the project has a "src" directory at the root, we believe files under that are production
  // files. Otherwise, we exclude test and configuration files only.
  if (fs.existsSync(path.join(projectRoot, 'src'))) {
    return [
      // Test files everywhere
      '**/*.test.{js,cjs,mjs,ts,cts,mts}',
      // Config files at the project root directory
      '*.config.{js,cjs,mjs,ts,cts,mts}',
      '.*rc.{js,cjs,mjs,ts,cts,mts}'
    ]
  }

  return [
    // Test files everywhere
    'test/**/*.{js,cjs,mjs,ts,cts,mts}',
    'tests/**/*.{js,cjs,mjs,ts,cts,mts}',
    '**/*.test.{js,cjs,mjs,ts,cts,mts}',
    // Config files at the project root directory
    '*.config.{js,cjs,mjs,ts,cts,mts}',
    '.*rc.{js,cjs,mjs,ts,cts,mts}'
  ]
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
  const [builtinConfigs, builtinDevConfigs] = getJsConfigs(options)
  const [nConfigs, nDevConfigs] = getNJsConfigs(options)
  const [importXConfigs, importXDevConfigs] = getImportXJsConfigs(options)
  const [unicornConfigs, unicornDevConfigs] = getUnicornConfigs(options)
  const userCustomConfig = userRules ? { rules: userRules } : {}
  const nonProductionFilesConfig = tsEslint.config({
    extends: [builtinDevConfigs, nDevConfigs, importXDevConfigs, unicornDevConfigs],
    files: getNonProductionFilePaths(options.projectRoot)
  })

  // https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects
  return tsEslint.config(
    globalIgnoresConfig,
    languageOptionsConfig,
    builtinConfigs,
    nConfigs,
    importXConfigs,
    unicornConfigs,
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
  const [builtinConfigs, builtinDevConfigs] = getTsConfigs(options)
  const [nConfigs, nDevConfigs] = getNTsConfigs(options)
  const [importXConfigs, importXDevConfigs] = getImportXTsConfigs(options)
  const [pathAliasConfigs, pathAliasDevConfigs] = getPathAliasConfigs(options)
  const [unicornConfigs, unicornDevConfigs] = getUnicornConfigs(options)
  const userCustomConfig = userRules ? { rules: userRules } : {}
  const nonProductionFilesConfig = tsEslint.config({
    extends: [
      builtinDevConfigs,
      nDevConfigs,
      importXDevConfigs,
      pathAliasDevConfigs,
      unicornDevConfigs
    ],
    files: getNonProductionFilePaths(options.projectRoot)
  })

  // https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects
  return tsEslint.config(
    globalIgnoresConfig,
    languageOptionsConfig,
    builtinConfigs,
    nConfigs,
    importXConfigs,
    pathAliasConfigs,
    unicornConfigs,
    userCustomConfig,
    nonProductionFilesConfig,
    prettierConfigs
  )
}
