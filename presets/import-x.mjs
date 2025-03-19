// @ts-check

// https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#rules

import fs from 'node:fs'
import path from 'node:path'

import tsParser from '@typescript-eslint/parser'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import importX from 'eslint-plugin-import-x'
import json5 from 'json5'

/* eslint sort-keys: off */

/** @satisfies {import('eslint').Linter.RulesRecord} */
const HELPFUL_WARNING_RULES = /** @type {const} */ {
  'import-x/export': 'error',
  'import-x/no-empty-named-blocks': 'warn',
  'import-x/no-extraneous-dependencies': 'error',
  'import-x/no-mutable-exports': 'warn',
  'import-x/no-named-as-default': 'warn',
  'import-x/no-named-as-default-member': 'warn',
  'import-x/no-unused-modules': 'warn'
}

/** @satisfies {import('eslint').Linter.RulesRecord} */
const MODULE_SYSTEM_RULES = /** @type {const} */ {}

/** @satisfies {import('eslint').Linter.RulesRecord} */
const STATIC_ANALYSIS_RULES = /** @type {const} */ {
  'import-x/default': 'error',
  'import-x/named': 'error',
  'import-x/namespace': 'error',
  // This rule is computationally expensive, and this rarely happens. Should we disable
  // it? See https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-cycle.md.
  'import-x/no-cycle': 'error',
  'import-x/no-relative-packages': 'warn',
  'import-x/no-relative-parent-imports': 'warn',
  'import-x/no-self-import': 'error',
  // This rule has some false positive. n/no-missing-import is a more powerful version of this rule.
  // 'import-x/no-unresolved': 'error',
  'import-x/no-useless-path-segments': 'warn'
}

/** @satisfies {import('eslint').Linter.RulesRecord} */
const STYLE_GUIDE_RULES = /** @type {const} */ {
  'import-x/consistent-type-specifier-style': ['warn', 'prefer-top-level'],
  // Don't add extensions to JS and TS files.
  'import-x/extensions': [
    'error',
    'always',
    {
      js: 'never',
      cjs: 'never',
      mjs: 'never',
      ts: 'never',
      cts: 'never',
      mts: 'never'
    }
  ],
  'import-x/first': 'warn',
  // TODO: should we set considerComments to true and count to 2?
  'import-x/newline-after-import': ['warn', { count: 1, considerComments: false }],
  // Import/no-duplicates takes over ESLint's built-in no-duplicate-imports.
  'no-duplicate-imports': 'off',
  'import-x/no-duplicates': ['warn', { 'prefer-inline': false }],
  // Though this rule is from ESLint's built-ins, it's included here since import-x/order
  // is overriding its default behavior.
  'sort-imports': [
    'warn',
    {
      ignoreCase: false,
      ignoreDeclarationSort: true, // This is handled by import/order.
      ignoreMemberSort: false
    }
  ],
  'import-x/order': [
    'warn',
    {
      'groups': [
        'builtin',
        'external',
        ['internal', 'parent', 'sibling', 'index'],
        ['object', 'type']
      ],
      'newlines-between': 'always',
      'alphabetize': {
        caseInsensitive: false,
        order: 'asc',
        orderImportKind: 'asc'
      }
    }
  ]
}

/** @satisfies {import('eslint').Linter.RulesRecord} */
const DEFAULT_RULES = /** @type {const} */ {
  ...HELPFUL_WARNING_RULES,
  ...MODULE_SYSTEM_RULES,
  ...STATIC_ANALYSIS_RULES,
  ...STYLE_GUIDE_RULES
}

/** @returns {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config} */
export function getJsConfig() {
  return {
    plugins: { 'import-x': importX },
    rules: DEFAULT_RULES
  }
}

/**
 * @param {string} tsConfigJsonPath the root directory of the project
 * @returns {import('eslint').Linter.RulesRecord}
 */
function getTsRules(tsConfigJsonPath) {
  // The 'import-x/no-relative-parent-imports' rule does not well handle path aliases defined in
  // tsconfig.json in TypeScript projects. Therefore we need to do some special handling here.

  const tsConfig = json5.parse(fs.readFileSync(tsConfigJsonPath, 'utf8'))
  const paths = tsConfig.compilerOptions && tsConfig.compilerOptions.paths
  if (!paths) {
    return DEFAULT_RULES
  }

  const aliases = Object.keys(paths)
    .filter((k) => k.endsWith('/*'))
    .map((k) => k.slice(0, -1))
  if (aliases.length === 0) {
    return DEFAULT_RULES
  }

  /** @type {import('eslint').Linter.RulesRecord} */
  const rules = { ...DEFAULT_RULES } // Make a copy
  rules['import-x/no-relative-parent-imports'] = [
    DEFAULT_RULES['import-x/no-relative-parent-imports'],
    { ignore: aliases }
  ]
  return rules
}

/**
 * @param {string} projectRoot
 * @returns {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config}
 */
export function getTsConfig(projectRoot) {
  return {
    plugins: { 'import-x': importX },
    rules: getTsRules(path.join(projectRoot, 'tsconfig.json')),
    languageOptions: {
      parser: tsParser
    },
    // The eslint-plugin-import-x cannot resolve TypeScript path aliases defined in tsconfig.json.
    // We need to use the eslint-import-resolver-typescript plugin to resolve them.
    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver({ project: projectRoot })]
    }
  }
}
