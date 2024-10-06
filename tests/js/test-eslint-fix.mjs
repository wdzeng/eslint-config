import { readFileSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'

import test from 'ava'
import eslint from 'eslint'

const outDir = path.resolve(import.meta.dirname, 'out')
const inputPattern = path.resolve(outDir, '**/*.js')
const linter = new eslint.ESLint({
  fix: true,
  ignore: false,
  overrideConfigFile: path.resolve(import.meta.dirname, 'eslint.config.test.mjs')
})
const results = await linter.lintFiles([inputPattern])
await eslint.ESLint.outputFixes(results)

for (const result of results) {
  const relTestPath = path.relative(outDir, result.filePath)
  const testName = `js/${path.basename(result.filePath, '.js')}`

  if (testName === 'js/dummy') {
    continue
  }

  test(testName, async (t) => {
    const expectedFixResult = await fs.readFile(
      path.resolve(import.meta.dirname, 'ans', relTestPath),
      'utf8'
    )
    let realFixResult = result.output
    if (realFixResult === undefined) {
      // If ESLint does not produce the result, it means it thinks the file is already correct.
      realFixResult = readFileSync(result.filePath, 'utf8')
    }
    t.is(realFixResult, expectedFixResult)
  })
}
