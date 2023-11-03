import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

import test from 'ava'
import eslint from 'eslint'

const currentDir = path.dirname(url.fileURLToPath(import.meta.url))
const outDir = path.resolve(currentDir, 'out')
const inputPattern = path.resolve(outDir, '**/*.ts')
const linter = new eslint.ESLint({
  fix: true,
  ignore: false,
  overrideConfigFile: path.resolve(currentDir, '.eslintrc.test.cjs')
})
const results = await linter.lintFiles([inputPattern])
await eslint.ESLint.outputFixes(results)

for (const result of results) {
  const relTestPath = path.relative(outDir, result.filePath)
  const testName = `ts/${path.basename(result.filePath, '.ts')}`

  if (testName === 'ts/dummy') {
    continue
  }

  test(testName, async (t) => {
    const expectedFixResult = await fs.readFile(
      path.resolve(currentDir, 'ans', relTestPath),
      'utf8'
    )
    const realFixResult = result.output
    t.is(realFixResult, expectedFixResult)
  })
}
