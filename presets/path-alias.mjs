// https://github.com/msfragala/eslint-plugin-path-alias

// @ts-expect-error: this package does not have type definitions
import pathAlias from 'eslint-plugin-path-alias'
import tsEslint from 'typescript-eslint'

/**
 * @typedef Options
 * @prop {string} projectRoot The root directory of the project
 * @prop {boolean} [node] Whether the runtime is Node.js
 * @prop {boolean} [browser] Whether the runtime is a browser
 */

/**
 * @param {Options} _options
 * @return {[import('typescript-eslint').ConfigArray, import('typescript-eslint').ConfigArray]}
 */
export function getConfigs(_options) {
  return [
    tsEslint.config(
      { plugins: { 'path-alias': pathAlias } },
      { rules: { 'path-alias/no-relative': ['warn'] } }
    ),
    []
  ]
}
