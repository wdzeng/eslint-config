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
import {
  getJsConfigs as getVitestJsConfigs,
  getTsConfigs as getVitestTsConfigs
} from './presets/vitest.mjs'

/**
 * @typedef Options
 * @prop {string} projectRoot The root directory of the project
 * @prop {import('eslint').Linter.EcmaVersion} [ecmaVersion] The ECMAScript version to lint for
 * @prop {string[]} [ignores] Glob patterns to ignore
 * @prop {boolean} [node] Whether the runtime is Node.js
 * @prop {boolean} [browser] Whether the runtime is a browser
 * @prop {boolean} [vitest] Whether the project uses Vitest
 * @prop {string[]} [testFiles] The glob patterns of test code
 */

/** @type {Required<Omit<Options, 'projectRoot' | 'sourceCode' | 'testFiles'>>} */
const DEFAULT_OPTIONS = {
  ecmaVersion: 2022,
  ignores: ['out/**', 'dist/**', 'build/**', 'coverage/**'],
  node: true,
  browser: false,
  vitest: false
}

/**
 * Ensures the options object is valid.
 * @param {object} options the options object
 * @returns {asserts options is Options}
 */
function requireValidOptions(options) {
  const allowedKeys = new Set([
    'browser',
    'ecmaVersion',
    'ignores',
    'node',
    'vitest',
    'projectRoot',
    'testFiles'
  ])

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
    // @ts-expect-error: it's OK to use the key here
    if (!(k in options) || options[k] === undefined) {
      missingKeys.push(k)
    }
  }
  if (missingKeys.length > 0) {
    throw new TypeError(`Missing required options: ${missingKeys.join(', ')}`)
  }
}

/**
 * @param {Options} options
 * @returns {[string[], string[]]} A pair of test paths and non-test paths
 */
function getNonProductionFilePaths(options) {
  const CONFIG_FILES = ['*.config.{js,cjs,mjs,ts,cts,mts}', '.*rc.{js,cjs,mjs,ts,cts,mts}']
  const TEST_FILES = [
    '**/*.test.{js,cjs,mjs,ts,cts,mts}',
    '**/*.spec.{js,cjs,mjs,ts,cts,mts}',
    'test/**/*.{js,cjs,mjs,ts,cts,mts}',
    'tests/**/*.{js,cjs,mjs,ts,cts,mts}'
  ]

  return [options.testFiles ?? TEST_FILES, CONFIG_FILES]
}

/**
 * @param {import('eslint').Linter.RulesRecord} [userRules]
 * @returns {[import('eslint').Linter.RulesRecord, import('eslint').Linter.RulesRecord]} */
function getUserCustomRules(userRules) {
  if (!userRules) {
    return [{}, {}]
  }

  /** @type {import('eslint').Linter.RulesRecord} */
  const userCustomRules = {}
  /** @type {import('eslint').Linter.RulesRecord} */
  const userCustomTestSRules = {}
  for (const [k, v] of Object.entries(userRules)) {
    if (k.startsWith('vitest/')) {
      userCustomTestSRules[k] = v
    } else {
      userCustomRules[k] = v
    }
  }
  return [userCustomRules, userCustomTestSRules]
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

  const [testFilePaths, nonTestFilePaths] = getNonProductionFilePaths(options)
  const [userCustomRules, userCustomTestRules] = getUserCustomRules(userRules)

  const globalIgnoresConfig = options.ignores ? globalIgnores(options.ignores) : {}
  const languageOptionsConfig = { languageOptions }
  const [builtinConfigs, builtinDevConfigs] = getJsConfigs(options)
  const [nConfigs, nDevConfigs] = getNJsConfigs(options)
  const [importXConfigs, importXDevConfigs] = getImportXJsConfigs(options)
  const [unicornConfigs, unicornDevConfigs] = getUnicornConfigs(options)
  const vitestConfigs = options.vitest ? getVitestJsConfigs(testFilePaths) : []
  const nonProductionFilesConfig = tsEslint.config({
    extends: [builtinDevConfigs, nDevConfigs, importXDevConfigs, unicornDevConfigs],
    files: [...testFilePaths, ...nonTestFilePaths]
  })
  const userCustomConfig = { rules: userCustomRules }
  const userCustomTestConfig = options.vitest
    ? { files: testFilePaths, rules: userCustomTestRules }
    : {}

  // https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects
  return tsEslint.config(
    globalIgnoresConfig,
    languageOptionsConfig,
    builtinConfigs,
    nConfigs,
    importXConfigs,
    unicornConfigs,
    vitestConfigs,
    nonProductionFilesConfig,
    userCustomConfig,
    userCustomTestConfig,
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
        // TODO: should we add typescript files here?
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

  const [testFilePaths, nonTestFilePaths] = getNonProductionFilePaths(options)
  const [userCustomRules, userCustomTestRules] = getUserCustomRules(userRules)

  const globalIgnoresConfig = options.ignores ? globalIgnores(options.ignores) : {}
  const languageOptionsConfig = { name: 'language-options', languageOptions }
  const [builtinConfigs, builtinDevConfigs] = getTsConfigs(options)
  const [nConfigs, nDevConfigs] = getNTsConfigs(options)
  const [importXConfigs, importXDevConfigs] = getImportXTsConfigs(options)
  const [pathAliasConfigs, pathAliasDevConfigs] = getPathAliasConfigs(options)
  const [unicornConfigs, unicornDevConfigs] = getUnicornConfigs(options)
  const vitestConfigs = options.vitest ? getVitestTsConfigs(testFilePaths) : []
  const nonProductionFilesConfig = tsEslint.config({
    extends: [
      builtinDevConfigs,
      nDevConfigs,
      importXDevConfigs,
      pathAliasDevConfigs,
      unicornDevConfigs
    ],
    files: [...testFilePaths, ...nonTestFilePaths]
  })
  const userCustomConfig = { rules: userCustomRules }
  const userCustomTestConfig = options.vitest
    ? { files: testFilePaths, rules: userCustomTestRules }
    : {}

  // https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects
  return tsEslint.config(
    globalIgnoresConfig,
    languageOptionsConfig,
    builtinConfigs,
    nConfigs,
    importXConfigs,
    pathAliasConfigs,
    unicornConfigs,
    vitestConfigs,
    nonProductionFilesConfig,
    userCustomConfig,
    userCustomTestConfig,
    prettierConfigs
  )
}
