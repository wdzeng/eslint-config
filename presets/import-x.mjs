// @ts-check
// https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#rules

import tsParser from '@typescript-eslint/parser'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import importX from 'eslint-plugin-import-x'

/** @satisfies {import('eslint').Linter.RulesRecord} */
const DEFAULT_RULES = /** @type {const} */ {
  // Helpful warnings.

  'import-x/export': 'error',
  'import-x/no-empty-named-blocks': 'warn',
  'import-x/no-extraneous-dependencies': 'error',
  'import-x/no-mutable-exports': 'warn',
  'import-x/no-named-as-default': 'warn',
  'import-x/no-named-as-default-member': 'warn',
  'import-x/no-unused-modules': 'warn',

  // Module system (none).

  // Static analysis.

  'import-x/default': 'error',
  'import-x/named': 'error',
  'import-x/namespace': 'error',
  // This rule is computationally expensive, and this rarely happens. Should we disable
  // it? See https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-cycle.md.
  'import-x/no-cycle': 'error',
  'import-x/no-relative-packages': 'warn',
  'import-x/no-self-import': 'error',
  // This rule has some false positive. n/no-missing-import is a more powerful version of this rule.
  // 'import-x/no-unresolved': 'error',
  'import-x/no-useless-path-segments': 'warn',

  // Style guide.

  // ❌ import { type T } from 'module'
  // ✅ import type { T } from 'module'
  // Hint: though this rule works only on TypeScript files, it does not matter to include in JS
  // project, so I do not add a separate rule for JS.
  'import-x/consistent-type-specifier-style': ['warn', 'prefer-top-level'],
  // Don't add extensions to JS and TS files.
  //
  // TODO: this rule does not work well if an import is not found. E.g. we want that this rule
  // forbids the use of .js extension. But if ./foo is not found, this rule will want to fix `import
  // Foo from './foo'` to `import Foo from './foo.js'`.
  'import-x/extensions': [
    'error',
    'ignorePackages',
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
  // Hint: we can only set the new line count to 1, or else the it will conflict with prettier.
  'import-x/newline-after-import': ['warn', { count: 1, considerComments: false }],
  // Import/no-duplicates takes over ESLint's built-in no-duplicate-imports.
  'no-duplicate-imports': 'off',
  'import-x/no-duplicates': ['warn', { 'prefer-inline': false }],

  'sort-imports': 'off', // Prevent conflict.
  'import-x/order': [
    'warn',
    {
      'groups': [
        'builtin',
        'external',
        ['internal', 'parent', 'index', 'sibling'],
        'object',
        'type'
      ],
      'newlines-between': 'always',

      // TODO: This should be set to never, but it fails to create an empty line between non-type
      // and type imports.
      'newlines-between-types': 'always',

      // ❌ import { Y, X } from 'module'
      // ✅ import { X, Y } from 'module'
      'named': true,

      // ❌ A, a, B, b, C, c
      // ❌ a, A, b, B, c, C
      // ✅ A, B, C, a, b, c
      'alphabetize': {
        caseInsensitive: false,
        order: 'asc',
        orderImportKind: 'asc'
      },

      // This property is noted as `sortTypesAmongThemselves` in v4.9.0. But it seems to be wrong
      // (should be `sortTypesGroup`). Check if this is fixed in the future release.
      'sortTypesGroup': true
    }
  ]
}

/** @satisfies {import('eslint').Linter.RulesRecord} */
const NON_NODE_RULES = /** @type {const} */ {
  'import-x/no-nodejs-modules': 'error'
}

/** @satisfies {import('eslint').Linter.RulesRecord} */
const DEV_OVERRIDES_RULES = /** @type {const} */ {
  'import-x/no-extraneous-dependencies': 'off'
}

/**
 * @typedef Options
 * @prop {string} projectRoot The root directory of the project
 * @prop {boolean} [node] Whether the runtime is Node.js
 * @prop {boolean} [browser] Whether the runtime is a browser
 */

/**
 * @param {Options} options
 * @return {[import('typescript-eslint').ConfigArray, import('typescript-eslint').ConfigArray]}
 */
export function getJsConfigs(options) {
  const rules = { ...DEFAULT_RULES }
  if (!options.node) {
    Object.assign(rules, NON_NODE_RULES)
  }
  return [[{ plugins: { 'import-x': importX }, rules }], [{ rules: DEV_OVERRIDES_RULES }]]
}

/**
 * @param {Options} options
 * @return {[import('typescript-eslint').ConfigArray, import('typescript-eslint').ConfigArray]}
 */
export function getTsConfigs(options) {
  const rules = { ...DEFAULT_RULES }
  if (!options.node) {
    Object.assign(rules, NON_NODE_RULES)
  }

  return [
    [
      {
        plugins: { 'import-x': importX },
        rules,
        languageOptions: {
          parser: tsParser
        },
        // The eslint-plugin-import-x cannot resolve TypeScript path aliases defined in tsconfig.json.
        // We need to use the eslint-import-resolver-typescript plugin to resolve them.
        settings: {
          'import-x/resolver-next': [
            createTypeScriptImportResolver({ project: options.projectRoot })
          ],
          // TODO: parse tsconfig.json to get the baseUrl and paths.
          'import-x/internal-regex': '^@/'
        }
      }
    ],
    [{ rules: DEV_OVERRIDES_RULES }]
  ]
}
