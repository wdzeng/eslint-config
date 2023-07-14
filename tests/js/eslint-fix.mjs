import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

// eslint-import does not recognize ava. See https://github.com/import-js/eslint-plugin-import/issues/2132
// eslint-disable-next-line import/no-unresolved
import test from 'ava'
import eslint from 'eslint'

const currentDir = path.dirname(url.fileURLToPath(import.meta.url))
const inputPattern = path.resolve(currentDir, 'in', '*.js')
const linter = new eslint.ESLint({ fix: true })
const results = await linter.lintFiles([inputPattern])
await eslint.ESLint.outputFixes(results)

for (const result of results) {
  const testName = path.basename(result.filePath, '.js')
  test(testName, async (t) => {
    const expectedFixResult = await fs.readFile(
      path.resolve(currentDir, 'out', `${testName}.js`),
      'utf8'
    )
    const realFixResult = result.output
    t.is(realFixResult, expectedFixResult)
  })
}
