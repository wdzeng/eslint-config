import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

import test from 'ava'
import eslint from 'eslint'

const currentDir = path.dirname(url.fileURLToPath(import.meta.url))
const inputPattern = path.resolve(currentDir, 'tmp', '*.ts')
const linter = new eslint.ESLint({ fix: true, ignore: false })
const results = await linter.lintFiles([inputPattern])
await eslint.ESLint.outputFixes(results)

for (const result of results) {
  const testName = path.basename(result.filePath, '.ts')
  test(`ts/${testName}`, async (t) => {
    const expectedFixResult = await fs.readFile(
      path.resolve(currentDir, 'out', `${testName}.ts`),
      'utf8'
    )
    const realFixResult = result.output
    t.is(realFixResult, expectedFixResult)
  })
}
