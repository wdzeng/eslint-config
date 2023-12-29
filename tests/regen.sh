#!/usr/bin/bash -ex

# This scripts regenerate the test cases under tests/ directory.

cd "$(dirname "$0")"

# Clear ans
rm -rf js/ans ts/ans

# Lint JS
cp -r js/in js/ans
npx eslint --config js/.eslintrc.test.cjs --no-ignore --fix 'js/ans/**/*.js'

# Regenerate symlinks
rm -rf ts/in/js-also
mkdir -p ts/in/js-also ts/ans/js-also
for f in js/in/ts-also/*.js; do
  ln -s "../../../$f" "ts/in/js-also/$(basename "${f%.js}").ts"
done
for f in js/ans/ts-also/*.js; do
  ln -s "../../../$f" "ts/ans/js-also/$(basename "${f%.js}").ts"
done

# Lint TS
cp -r ts/in/*.ts ts/ans/
npx eslint --config ts/.eslintrc.test.cjs --no-ignore --fix 'ts/ans/*.ts'

# Guarentee that the JS and TS files are the same
npx eslint --config ts/.eslintrc.test.cjs --no-ignore 'ts/ans/js-also/*.ts'
