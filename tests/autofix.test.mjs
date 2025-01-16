import fs from 'node:fs/promises'
import path from 'node:path'

import eslint from 'eslint'
import { describe, expect, test } from 'vitest'

function runTestGroup(ext) {
  describe(`[${ext}] autofix`, async () => {
    const linter = new eslint.ESLint({
      fix: true,
      ignore: false,
      overrideConfigFile: path.resolve(import.meta.dirname, `autofix/${ext}/eslint.config.mjs`)
    })

    const lintResults = await linter.lintFiles([
      path.resolve(import.meta.dirname, `autofix/${ext}/**.in.${ext}`)
    ])
    /** @type {[string, string | undefined][]} */
    const testInputs = lintResults.map((r) => {
      const testName = r.filePath.split('/').reverse()[0].slice(0, -`.in.${ext}`.length)
      return [testName, r.output]
    })

    test.for(testInputs)('%s', async ([fileName, lintOutput]) => {
      const expected = await fs.readFile(
        path.resolve(import.meta.dirname, `autofix/${ext}`, `${fileName}.ans.${ext}`),
        'utf8'
      )
      expect(lintOutput).toEqual(expected)
    })
  })
}

runTestGroup('js')
runTestGroup('ts')
