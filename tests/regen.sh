#!/usr/bin/bash -ex

# This scripts regenerate the test cases under tests/ directory.

cd "$(dirname "$0")"

# Clear ans
rm -rf js/ans ts/ans

# Lint JS
cp -r js/in js/ans
npx eslint --config js/eslint.config.mjs --no-ignore --fix 'js/ans/*.js'

# Lint TS
cp -r ts/in ts/ans
npx eslint --config ts/eslint.config.mjs --no-ignore --fix 'ts/ans/*.ts'
