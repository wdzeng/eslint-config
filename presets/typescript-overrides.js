// These rules override plugin:@typescript-eslint/strict-type-checked and
// plugin:@typescript-eslint/stylistic-type-checked.

/* eslint-disable sort-keys */

const jsRules = require('./recommended-overrides')

const overriddenRules = ['no-shadow', 'no-unused-expressions', 'no-unused-vars']

module.exports = Object.assign(
  {},
  ...overriddenRules.map((rule) => {
    const ret = {}
    ret[rule] = 'off'
    ret[`@typescript-eslint/${rule}`] = jsRules[rule]
    return ret
  })
)
