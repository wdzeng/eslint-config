import { getConfigForJs } from './index.mjs'

export default getConfigForJs(
  {
    // This project is special; even importing JS or TS files we need to specify the extension.
    'import-x/extensions': ['error', 'ignorePackages']
  },
  {
    browser: false,
    ecmaVersion: 2022,
    ignores: ['tests'],
    node: true,
    projectRoot: import.meta.dirname
  }
)
