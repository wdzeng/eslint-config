# eslint-config

These are my custom rules for [ESLint](https://eslint.org/).

This configuration contains rules from the following presets and plugins.

- [`eslint:recommended`](https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js)
- [`typescript-eslint`](https://typescript-eslint.io/)
- [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n)
- [`unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [`import`](https://github.com/import-js/eslint-plugin-import)
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
    'my-custom-rule-2': 'warn'
  },
  // options
  {
    node: true, // whether in Node.js
    browser: false, // whether in browser
    ecmaVersion: 2022, // ECMAScript version
    ignores: ['build', 'dist', 'test/examples/**/*.js'], // ignore files
    projectRoot: import.meta.dirname // project root dir
  }
)
```

Lint your codebase using ESLint:

```shell
npx eslint --fix
```

> [!NOTE]  
> Also add a .prettierrc in your project. Prettier rules are also applied.

## Setup with TypeScript Project

Install the required packages by running the following command in your shell:

```shell
pnpm add -D typescript@~5.5 eslint prettier github:wdzeng/eslint-config
```

> [!NOTE]  
> TypeScript 5.6 is not supported, as an dependency conflicts with it.

Declare a `eslint.config.mjs` file in your project and add the following JavaScript code:

```js
import { getConfigForTs } from 'eslint-config-wdzeng'

export default getConfigForTs(
  // custom rules
  {
    'my-custom-rule-1': 'warn',
    'my-custom-rule-2': 'warn'
  },
  // options
  {
    node: true, // whether in Node.js
    browser: false, // whether in browser
    ecmaVersion: 2022, // ECMAScript version
    ignores: ['build', 'dist', 'test/examples/**/*.ts'], // ignore files
    projectRoot: import.meta.dirname // project root dir
  }
)
```
