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
- [`prettier`](https://github.com/prettier/eslint-plugin-prettier)

## Setup with JavaScript Project

Install the required packages by running the following command in your shell:

```shell
pnpm add -D eslint prettier github:wdzeng/eslint-config
```

You only need to install `eslint`, `prettier`, manually. Other dependencies come along with the
package.

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
    ecmaVersion: 2023, // ECMAScript version (default 2023)
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
    ecmaVersion: 2023, // ECMAScript version (default 2023)
    node: true, // whether in Node.js (default true)
    browser: false, // whether in browser (default false)
    vitest: false // whether to use vitest to run unit tests (default false)
  }
)
```
