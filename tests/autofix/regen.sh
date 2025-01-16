#!/bin/bash -e

cd "$(dirname "$0")/js"
rm -rf backup ./*.ans.js
mkdir backup
cp ./*.in.js backup/
npx eslint --fix --ignore-pattern backup ./*.in.js >/dev/null || true
for f in ./*.in.js; do
  mv "$f" "${f%.in.js}.ans.js"
done
mv backup/* ./
rmdir backup

cd ../ts
rm -rf backup ./*.ans.ts
mkdir backup
cp ./*.in.ts backup/
npx eslint --fix --ignore-pattern backup ./*.in.ts >/dev/null || true
for f in ./*.in.ts; do
  mv "$f" "${f%.in.ts}.ans.ts"
done
mv backup/* ./
rmdir backup
