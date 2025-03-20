// @ts-check
/* eslint-disable unicorn/consistent-function-scoping */

import assert from 'node:assert'
import path from 'node:path'

import tsEslint from 'typescript-eslint'
import { describe, test } from 'vitest'

import { getConfigForJs, getConfigForTs } from '../index.mjs'

/**
 * @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} configFile
 * @returns {import('eslint').Linter.RulesRecord}
 */
function getAllRules(configFile) {
  assert(!(configFile instanceof Promise))

  const ret = /** @type {import('eslint').Linter.RulesRecord} */ {}
  for (const config of configFile) {
    if (config.rules) {
      Object.assign(ret, config.rules)
    }
  }

  // @ts-expect-error: it's OK to return a non-empty object.
  return ret
}

function getJsConfig() {
  // TODO: create another tiny project to test.
  return getConfigForJs({}, { projectRoot: path.resolve(import.meta.dirname, 'autofix/js') })
}

function getTsConfig() {
  // TODO: create another tiny project to test.
  return getConfigForTs({}, { projectRoot: path.resolve(import.meta.dirname, 'autofix/ts') })
}

describe('Any rule that has name no-unnecessary-* should be set to warning level', () => {
  const EXCEPTED_RULES = ['unicorn/no-unnecessary-await']

  /** @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} configs */
  function check(configs) {
    assert(!(configs instanceof Promise))

    const rules = getAllRules(configs)
    for (const [ruleName, settings] of Object.entries(rules)) {
      if (!/^.*\/no-unnecessary-/.test(ruleName)) {
        continue
      }
      if (EXCEPTED_RULES.includes(ruleName)) {
        continue
      }
      const level = Array.isArray(settings) ? settings[0] : settings
      if (level === 'error' || level === 2) {
        throw new Error(`Rule ${ruleName} expected to be warn level, but got error.`)
      }
    }
  }

  test('JS', () => {
    check(getJsConfig())
  })
  test('TS', () => {
    check(getTsConfig())
  })
})

test('Any rule from typescript-eslint stylistic-type-checked preset should be set to warning level', () => {
  const stylisticRules = new Set(Object.keys(getAllRules(tsEslint.configs.stylisticTypeChecked)))
  const rules = getAllRules(
    getConfigForTs({}, { projectRoot: path.resolve(import.meta.dirname, 'autofix/ts') })
  )
  for (const rule of Object.entries(rules)) {
    if (stylisticRules.has(rule[0])) {
      const level = Array.isArray(rule[1]) ? rule[1][0] : rule[1]
      if (level === 'error' || level === 2) {
        test.fails(`Rule ${rule[0]} expected to be warn level, but got error.`)
      }
    }
  }
})

describe('Any rule from prettier should be set to warning level', () => {
  /** @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} configs */
  function check(configs) {
    assert(!(configs instanceof Promise))

    const rules = getAllRules(configs)
    for (const [ruleName, settings] of Object.entries(rules)) {
      if (ruleName.startsWith('prettier/')) {
        const level = Array.isArray(settings) ? settings[0] : settings
        if (level === 'error' || level === 2) {
          throw new Error(`Rule ${ruleName} expected to be warn level, but got error.`)
        }
      }
    }
  }

  test('JS', () => {
    check(getJsConfig())
  })
  test('TS', () => {
    check(getTsConfig())
  })
})
