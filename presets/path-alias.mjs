// https://github.com/msfragala/eslint-plugin-path-alias

import { defineConfig } from 'eslint/config'
// @ts-expect-error: this package does not have type definitions
import pathAlias from 'eslint-plugin-path-alias'

/**
 * @typedef Options
 * @prop {string} projectRoot The root directory of the project
 * @prop {boolean} [node] Whether the runtime is Node.js
 * @prop {boolean} [browser] Whether the runtime is a browser
 */

/**
 * @param {Options} _options
 * @return {[import('eslint/config').Config[], import('eslint/config').Config]}
 */
export function getConfigs(_options) {
  const regularConfig = defineConfig(
    { plugins: { 'path-alias': pathAlias } },
    { rules: { 'path-alias/no-relative': 'warn' } }
  )
  const devOverrideConfig = {} // Empty config
  return [regularConfig, devOverrideConfig]
}
