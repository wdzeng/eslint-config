// These rules override plugin:import/recommended. See
// https://github.com/import-js/eslint-plugin-import#rules for all rules in that preset. The rules
// here are all JS/TS insensitive.

/* eslint sort-keys: off */

export default {
  'import/first': 'warn',
  'import/newline-after-import': ['warn', { considerComments: false, count: 1 }],
  // This rule has too many false positives. See
  // https://github.com/import-js/eslint-plugin-import/issues/2132.
  'import/no-unresolved': 'off',
  // Note that ordering types are not supported so far. See
  // https://github.com/import-js/eslint-plugin-import/issues/2441.
  'import/order': [
    'warn',
    {
      'alphabetize': {
        caseInsensitive: false,
        order: 'asc',
        orderImportKind: 'asc'
      },
      'groups': [
        'builtin',
        'external',
        ['internal', 'parent', 'sibling', 'index'],
        ['object', 'type']
      ],
      'newlines-between': 'always',
      'pathGroups': [{ group: 'internal', pattern: '@/**' }]
    }
  ],

  // Though this rule is from ESLint's built-ins, it's included here since import/order is
  // overriding its default behavior.
  'sort-imports': [
    'warn',
    {
      ignoreCase: false,
      ignoreDeclarationSort: true, // This is handled by import/order.
      ignoreMemberSort: false
    }
  ],
  'import/consistent-type-specifier-style': ['warn', 'prefer-top-level'],

  // Import/no-duplicates takes over ESLint's built-in no-duplicate-imports.
  'no-duplicate-imports': 'off',
  'import/no-duplicates': ['warn', { 'considerQueryString': true, 'prefer-inline': false }]
}
