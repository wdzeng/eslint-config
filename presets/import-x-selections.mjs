// https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#rules

/* eslint sort-keys: off */

// Helpful warnings
const helpfulWarnings = {
  'import-x/export': 'error',
  'import-x/no-empty-named-blocks': 'warn',
  'import-x/no-extraneous-dependencies': 'error',
  'import-x/no-mutable-exports': 'warn',
  'import-x/no-named-as-default': 'warn',
  'import-x/no-named-as-default-member': 'warn',
  'import-x/no-unused-modules': 'warn'
}

// Module systems (currently now rule is selected)
const moduleSystems = { }

// Static analysis
const staticAnalysis = {
  'import-x/default': 'error',
  'import-x/named': 'error',
  'import-x/namespace': 'error',
  // This rule is computationally expensive, and this rarely happens. Should we disable
  // it? See https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-cycle.md.
  'import-x/no-cycle': 'error',
  'import-x/no-relative-packages': 'warn',
  'import-x/no-relative-parent-imports': 'warn',
  'import-x/no-self-import': 'error',
  'import-x/no-unresolved': 'error',
  'import-x/no-useless-path-segments': 'warn'
}

// Style guide
const styleGuide = {
  'import-x/consistent-type-specifier-style': ['warn', 'prefer-top-level'],
  // Don't add extensions to JS and TS files.
  'import-x/extensions': ['error', 'always', {
    js: 'never',
    cjs: 'never',
    mjs: 'never',
    ts: 'never',
    cts: 'never',
    mts: 'never'
  }],
  'import-x/first': 'warn',
  // TODO: should we set considerComments to true and count to 2?
  'import-x/newline-after-import': ['warn', { count: 1, considerComments: false }],
  // Import/no-duplicates takes over ESLint's built-in no-duplicate-imports.
  'no-duplicate-imports': 'off',
  'import-x/no-duplicates': ['warn', { 'prefer-inline': false }],
  // Though this rule is from ESLint's built-ins, it's included here since import-x/order
  // is overriding its default behavior.
  'sort-imports': [
    'warn',
    {
      ignoreCase: false,
      ignoreDeclarationSort: true, // This is handled by import/order.
      ignoreMemberSort: false
    }
  ],
 'import-x/order': ['warn', {
    groups: [
      'builtin',
      'external',
      ['internal', 'parent', 'sibling', 'index'],
      ['object', 'type']
    ],
    'newlines-between': 'always',
    alphabetize: {
      caseInsensitive: false,
      order: 'asc',
      orderImportKind: 'asc'
    },
  }]
}

const rules = {
  ...helpfulWarnings,
  ...moduleSystems,
  ...staticAnalysis,
  ...styleGuide
}

export default rules
