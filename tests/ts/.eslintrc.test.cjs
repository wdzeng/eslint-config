module.exports = {
  root: true,
  extends: ['../../typescript'],
  env: {
    browser: false,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    project: process.env.REGEN_TESTCASES ? './tests/ts/tsconfig.regen.json' : './tests/ts/tsconfig.test.json'
  },
  rules: {
    // Your custom rules go here ...
    'prettier/prettier': 'warn'
  }
}
