// @ts-check
// https://github.com/vitest-dev/eslint-plugin-vitest?tab=readme-ov-file#rules

import vitest from '@vitest/eslint-plugin'

/** @satisfies {import('eslint').Linter.RulesRecord} */
const DEFAULT_RULES = /** @type {const} */ {
  'vitest/consistent-test-it': ['warn', { fn: 'test', withinDescribe: 'test' }],
  'vitest/expect-expect': 'warn',
  'vitest/no-alias-methods': 'warn',
  'vitest/no-done-callback': 'error',
  'vitest/no-duplicate-hooks': 'warn',
  'vitest/no-identical-title': 'warn',
  'vitest/no-import-node-test': 'error',
  'vitest/no-standalone-expect': 'error',
  'vitest/prefer-comparison-matcher': 'warn',
  'vitest/prefer-each': 'warn',
  'vitest/prefer-equality-matcher': 'warn',
  'vitest/prefer-expect-resolves': 'error',
  'vitest/prefer-hooks-in-order': 'warn',
  'vitest/prefer-hooks-on-top': 'warn',
  'vitest/prefer-lowercase-title': 'warn',
  'vitest/prefer-mock-promise-shorthand': 'warn',
  'vitest/prefer-strict-boolean-matchers': 'warn',
  'vitest/prefer-strict-equal': 'warn',
  'vitest/prefer-to-be': 'warn',
  'vitest/prefer-to-contain': 'warn',
  'vitest/prefer-to-have-length': 'warn',
  'vitest/prefer-vi-mocked': 'warn',
  'vitest/valid-describe-callback': 'error',
  'vitest/valid-expect': 'error',

  // Style
  'vitest/padding-around-all': 'warn',
  'vitest/padding-around-describe-blocks': 'warn'
}

/**
 * @param {string[]} testFilePaths
 * @return {import('typescript-eslint').ConfigArray}
 */
export function getJsConfigs(testFilePaths) {
  return [
    {
      name:'vitest',
      files: testFilePaths,
      plugins: {
        vitest
      },
      rules: DEFAULT_RULES,
      languageOptions: {
        globals: {
          ...vitest.environments.env.globals
        }
      }
    }
  ]
}

/**
 * @param {string[]} testFilePaths
 * @return {import('typescript-eslint').ConfigArray}
 */
export function getTsConfigs(testFilePaths) {
  return [
    {
      name:'vitest',
      files: testFilePaths,
      plugins: {
        vitest
      },
      rules: DEFAULT_RULES,
      settings: {
        vitest: {
          typecheck: true
        }
      },
      languageOptions: {
        globals: {
          ...vitest.environments.env.globals
        }
      }
    }
  ]
}
