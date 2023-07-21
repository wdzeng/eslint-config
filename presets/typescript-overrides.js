// These rules override plugin:@typescript-eslint/strict-type-checked and
// plugin:@typescript-eslint/stylistic-type-checked.

/* eslint-disable sort-keys */

const jsRules = require('./recommended-overrides')

const overriddenRules = {
  'no-empty-function': [
    'warn',
    {
      allow: [
        'private-constructors',
        'protected-constructors',
        'overrideMethods',
        'decoratedFunctions'
      ]
    }
  ],
  'no-shadow': undefined,
  'no-unused-expressions': undefined,
  'no-unused-vars': undefined
}

module.exports = Object.assign(
  {},
  ...Object.entries(overriddenRules).map((entry) => {
    const [ruleName, settings] = entry
    const ret = {}
    ret[ruleName] = 'off'
    ret[`@typescript-eslint/${ruleName}`] = settings ?? jsRules[ruleName]
    return ret
  })
)
