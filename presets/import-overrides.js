// These rules override plugin:import/recommended. See
// https://github.com/import-js/eslint-plugin-import#rules for all rules in that preset.

module.exports = {
  'import/first': 'warn',
  'import/newline-after-import': ['warn', { considerComments: false, count: 1 }],
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
  'sort-imports': [
    'warn',
    {
      ignoreCase: false,
      ignoreDeclarationSort: true, // This is handled by import/order.
      ignoreMemberSort: false
    }
  ]
}
