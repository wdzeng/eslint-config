# eslint-config

These are my custom rules for [ESLint](https://eslint.org/). Run linter + formatter (ESLint +
Prettier) two in one.

This configuration selects rules from the following sources.

- [`eslint`](https://eslint.org/)
- [`typescript-eslint`](https://typescript-eslint.io/)
- [`n`](https://github.com/eslint-community/eslint-plugin-n)
- [`unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [`import-x`](https://github.com/import-js/eslint-plugin-import-x)
- [`vitest`](https://github.com/vitest-dev/eslint-plugin-vitest)
- [`path-alias`](https://github.com/msfragala/eslint-plugin-path-alias)
- [`prettier`](https://github.com/prettier/eslint-plugin-prettier)

## Setup with JavaScript Project

Install the required packages by running the following command in your shell:

```shell
pnpm add -D eslint prettier github:wdzeng/eslint-config
```

Declare a `eslint.config.mjs` file in your project and add the following JavaScript code:

```js
import  { getConfigForJs } from 'eslint-config-wdzeng'

export default getConfigForJs(
  // custom rules
  {
    'my-custom-rule-1': 'warn',
    'my-custom-rule-2': ['warn', { foo: 'bar' }]
  },
  // options
  {
    projectRoot: import.meta.dirname // project root directory
    ignores: ['build', 'dist', 'test/examples/**/*.ts'], // global ignore files
    ecmaVersion: 2022, // ECMAScript version (default 2022)
    node: true, // whether in Node.js (default true)
    browser: false, // whether in browser (default false)
    vitest: false // whether to use vitest to run unit tests (default false)
  }
)
```

Lint your codebase using ESLint:

```shell
npx eslint --fix
```

## Setup with TypeScript Project

Install the required packages by running the following command in your shell:

```shell
pnpm add -D eslint prettier typescript github:wdzeng/eslint-config
```

Declare a `eslint.config.mjs` file in your project and add the following JavaScript code:

```js
import { getConfigForTs } from 'eslint-config-wdzeng'

export default getConfigForTs(
  // custom rules
  {
    'my-custom-rule-1': 'warn',
    'my-custom-rule-2': ['warn', { foo: 'bar' }]
  },
  // options
  {
    projectRoot: import.meta.dirname // project root directory
    ignores: ['build', 'dist', 'test/examples/**/*.ts'], // global ignore files
    ecmaVersion: 2022, // ECMAScript version (default 2022)
    node: true, // whether in Node.js (default true)
    browser: false, // whether in browser (default false)
    vitest: false // whether to use vitest to run unit tests (default false)
  }
)
```

## Dependencies and Requirements

You only need to install `eslint`, `prettier`, and `typescript` manually. Other dependencies come
along with the package.

### Requirements

- Node.js ^20.18.3 || ^22.12.0 || >=v23.1.0: to support [importing JSON
  modules](https://nodejs.org/api/esm.html#json-modules) so as to suppress linting warning messages
  (this is not a essential requirement though).
- (dev) Node.js ^20.18.3 || ^22.12.0 || >=v23.1.0: to support the use pf
  [`import.meta.dirname`](https://nodejs.org/docs/latest-v23.x/api/esm.html#importmetadirname).
- `eslint` >=9.20.0: to meet minimum version requirement of unicorn v57.
- `prettier` >=3: to meet minimum version requirement of `eslint-plugin-prettier` v3.1.
- `typescript` >=5: not tested what will happen for <5.

### Peer Dependencies

- `typescript-eslint` >=8.3: to support the `@typescript-eslint/no-deprecated` rule.
- `eslint-plugin-n` >=17: to support the `n/hashbang` rule.
- `eslint-plugin-import-x` >=4.9: to support latest options of the rule `import-x/order`.
- `eslint-plugin-unicorn` >=57: to support the `eslint-plugin-unicorn/consistent-date-clone`,
  `eslint-plugin-unicorn/no-accessor-recursion`, `eslint-plugin-unicorn/no-named-default`, and
  `eslint-plugin-unicorn/no-instanceof-builtins` rules.
- `eslint-plugin-path-alias` >=2: to automatic support for TypeScript paths and package imports.
- `@vitest/eslint-plugin` >=v1.1.26: to support the `prefer-strict-boolean-matchers` rule.
- `eslint-plugin-prettier` >=5.1: to use the provided recommended rule set.
