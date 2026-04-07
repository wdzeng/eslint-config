import { defineConfig } from 'eslint/config'

import { getConfigForJs, getConfigForTs } from './index.mjs'

const generalConfigs = getConfigForJs(
  {
    // We add file extensions to import JS and TS files in this project.
    'import-x/extensions': ['error', 'ignorePackages']
  },
  {
    browser: false,
    ecmaVersion: 2023,
    ignores: ['tests/**/*.js', 'tests/**/*.ts'],
    node: true,
    projectRoot: import.meta.dirname
  }
)

let tsConfigs = getConfigForTs(undefined, {
  browser: false,
  ecmaVersion: 2023,
  node: true,
  projectRoot: import.meta.dirname
})

tsConfigs = defineConfig({
  extends: [tsConfigs],
  files: ['index.d.ts']
})

export default defineConfig(generalConfigs, tsConfigs)
