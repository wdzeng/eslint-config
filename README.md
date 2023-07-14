# eslint-config

These are my custom rules for [ESLint](https://eslint.org/).

This configuration extends the
[`eslint:recommended`](https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js)
preset and includes certain rules from the
[`unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn) plugin.
However, it does not extend the
[`unicorn:recommended`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/configs/recommended.js)
preset because some of its rules are too strict.

To make the most of [Prettier](https://prettier.io/), it is advisable to utilize
the
[eslint prettier plugin](https://github.com/prettier/eslint-plugin-prettier).
This plugin enables you to format and lint your code simultaneously by
incorporating ESLint.

## Usage (JavaScript Project)

Install the required packages by running the following command in your shell:

```shell
pnpm add -D eslint prettier github:wdzeng/eslint-config
```

Declare a `.eslintrc.cjs` file in your project and add the following JavaScript
code:

```js
/* eslint-env node */
module.exports = {
  root: true,
  extends: ['wdzeng'],
  env: {
    browser: false,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  rules: {
    // Your custom rules go here ...
    'prettier/prettier': 'warn'
  }
}
```

## Usage (TypeScript Project)

Install the required packages by running the following command in your shell:

```shell
pnpm add -D typescript eslint prettier github:wdzeng/eslint-config
```

Declare a `.eslintrc.cjs` file in your project and add the following JavaScript
code:

```js
/* eslint-env node */
module.exports = {
  root: true,
  extends: ['wdzeng/typescript'],
  env: {
    browser: false,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    // Your custom rules go here ...
    'prettier/prettier': 'warn'
  }
}
```
