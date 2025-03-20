// @ts-check

/* eslint-disable sort-keys */

import { parseArgs } from 'node:util'

import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'

/**
 * These rules override eslint:recommended. See https://eslint.org/docs/latest/rules/ for all rules
 * in that rule set.
 *
 * @satisfies {import('eslint').Linter.RulesRecord}
 */
const ESLINT_RECOMMENDED_OVERRIDE_RULES = /** @type {const} */ {
  // Styles.
  'capitalized-comments': [
    'warn',
    'always',
    { ignoreConsecutiveComments: true, ignorePattern: 'cspell:' }
  ],
  'curly': ['warn', 'all'],
  'dot-notation': 'warn',
  'linebreak-style': ['error', 'unix'],
  'no-else-return': ['warn', { allowElseIf: false }],
  'no-negated-condition': 'warn',
  'no-tabs': 'warn',
  'quote-props': ['warn', 'consistent-as-needed'],
  'sort-keys': [
    'warn',
    'asc',
    { allowLineSeparatedGroups: true, caseSensitive: true, minKeys: 4, natural: true }
  ],
  'spaced-comment': 'warn',

  // Error-related.
  'no-throw-literal': 'warn',

  // Variable declaration-related.
  'no-sequences': 'warn',
  'no-shadow': 'error',
  // Allow unused arguments that start with underscore. This is useful for overriding functions or
  // implementing event listeners. However, tsc still complain this unless the argument name has
  // prefixed with underscore; therefore align the ESLint rule with tsc.
  'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  'no-use-before-define': [
    'error',
    { allowNamedExports: true, functions: false, variables: true, classes: false }
  ],
  'no-var': 'warn',
  'prefer-const': 'warn',

  // Promise-related.
  'no-void': ['warn', { allowAsStatement: true }], // Allow to fire and forget promises
  'prefer-promise-reject-errors': 'warn',
  'require-await': 'warn',

  // Array-related.
  'no-array-constructor': 'warn',

  // Import/export-related.
  'no-duplicate-imports': 'warn',

  // Others.
  'consistent-return': 'warn',
  'default-case-last': 'error',
  'default-param-last': 'error',
  'eqeqeq': 'warn',
  'no-empty-function': 'warn',
  'no-empty-static-block': 'warn',
  'no-invalid-this': 'error',
  'no-iterator': 'warn',
  'no-lone-blocks': 'warn',
  'no-lonely-if': 'warn',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-native-nonconstructor': 'off', // Covered by unicorn/new-for-builtins
  'no-new-object': 'warn',
  'no-new-wrappers': 'warn',
  'no-self-compare': 'warn',
  'no-unreachable-loop': 'warn',
  'no-unused-expressions': ['warn', { allowShortCircuit: true, allowTernary: true }],
  'no-unused-private-class-members': 'warn',
  'no-useless-call': 'warn',
  'no-useless-rename': 'warn',
  'no-useless-return': 'warn',
  'prefer-exponentiation-operator': 'warn',
  'prefer-template': 'warn'
}

/**
 * These rules override plugin:@typescript-eslint/strict-type-checked and
 * plugin:@typescript-eslint/stylistic-type-checked. See https://typescript-eslint.io/rules/ for all
 * rules in those rule sets.
 *
 * @satisfies {import('eslint').Linter.RulesRecord}
 */
const TS_RECOMMENDED_OVERRIDE_RULES = /** @type {const} */ {
  // Rules in ESLint that conflict with typescript-eslint.
  'no-empty-function': 'off',
  '@typescript-eslint/no-empty-function': [
    'warn',
    {
      allow: [
        'private-constructors',
        'protected-constructors',
        'overrideMethods',
        'decoratedFunctions'
      ]
    }
  ],
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'warn',
  'no-unused-expressions': 'off',
  '@typescript-eslint/no-unused-expressions': 'warn',
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  'dot-notation': 'off',
  '@typescript-eslint/dot-notation': 'warn',
  'require-await': 'off',
  '@typescript-eslint/require-await': 'warn',
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': [
    'error',
    {
      functions: false,
      classes: false,
      variables: true,
      allowNamedExports: true,
      typedefs: false,
      ignoreTypeReferences: true
    }
  ],

  // Other customizations.
  '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
  '@typescript-eslint/no-confusing-void-expression': ['warn', { ignoreArrowShorthand: true }],
  '@typescript-eslint/no-import-type-side-effects': 'warn',
  '@typescript-eslint/no-non-null-assertion': 'off', // It's OK to use ! for non-null assertion
  '@typescript-eslint/restrict-template-expressions': [
    'warn',
    { allowBoolean: true, allowNumber: true }
  ]
}

/**
 * @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config | import('typescript-eslint').ConfigArray} c
 * @param {string} [prefix]
 * @returns {import('typescript-eslint').ConfigArray}
 */
function toWarningRules(c, prefix) {
  const ret = {}
  const configs = Array.isArray(c) ? c : [c]
  for (const config of configs) {
    const { rules } = config
    if (!rules) {
      continue
    }
    for (const [k, v] of Object.entries(rules)) {
      if (!prefix || k.startsWith(prefix)) {
        if (Array.isArray(v)) {
          if (v[0] === 'error' || v[0] === 2) {
            ret[k] = ['warn', ...v.slice(1)]
          }
        } else if (v === 'error' || v === 2) {
          ret[k] = 'warn'
        }
      }
    }
  }
  return tsEslint.config(configs, { rules: ret })
}

/** @return {import('typescript-eslint').ConfigArray} */
export function getJsConfigs() {
  return tsEslint.config(toWarningRules(eslint.configs.recommended, 'no-unnecessary-'), {
    rules: ESLINT_RECOMMENDED_OVERRIDE_RULES
  })
}

/** @return {import('typescript-eslint').ConfigArray} */
export function getTsConfigs() {
  return tsEslint.config({
    extends: [
      getJsConfigs(),
      toWarningRules(tsEslint.configs.eslintRecommended, '@typescript-eslint/no-unnecessary-'),
      toWarningRules(tsEslint.configs.strictTypeChecked, '@typescript-eslint/no-unnecessary-'),
      toWarningRules(tsEslint.configs.stylisticTypeChecked)
    ],
    rules: TS_RECOMMENDED_OVERRIDE_RULES
  })
}
