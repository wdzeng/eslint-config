const conflictedJavascriptRules = {
  // JavaScript no-shadow rule doesn't work with TypeScript.
  'no-shadow': 'off'
}

const typescriptRules = {
  '@typescript-eslint/no-shadow': 'error'
}

module.exports = {
  extends: [
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: Object.assign(conflictedJavascriptRules, typescriptRules),
  settings: {
    // https://github.com/import-js/eslint-plugin-import/tree/main#typescript
    'import/resolver': {
      node: true,
      typescript: true
    }
  }
}
