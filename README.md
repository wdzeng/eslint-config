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

Declare a `.eslintrc.cjs` file in your project and add the following JavaScript code:

```js
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

Lint your codebase using ESLint:

```shell
npx eslint --fix
```

> [!NOTE]  
> Also add a .prettierrc in your project. Prettier rules are also selected.

## Setup with TypeScript Project

Install the required packages by running the following command in your shell:

```shell
pnpm add -D typescript eslint prettier github:wdzeng/eslint-config
```

Declare a `.eslintrc.cjs` file in your project and add the following JavaScript code:

```js
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
