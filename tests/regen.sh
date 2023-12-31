#!/usr/bin/bash -ex

# This scripts regenerate the test cases under tests/ directory.

cd "$(dirname "$0")"

# Clear ans
rm -rf js/ans ts/ans

# Lint JS
cp -r js/in js/ans
npx eslint --config js/.eslintrc.test.cjs --no-ignore --fix 'js/ans/*.js'

# Lint TS
cp -r ts/in ts/ans
npx eslint --config ts/.eslintrc.test.cjs --no-ignore --fix 'ts/ans/*.ts'
