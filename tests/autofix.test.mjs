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
    /** @type {[string, string | undefined, string][]} */
    const testInputs = lintResults.map((r) => {
      let testName = r.filePath.split('/').at(-1).slice(0, -`.in.${ext}`.length)
      if (testName.endsWith('.test')) {
        testName = testName.slice(0, -'.test'.length)
      }
      const ansPath = r.filePath.replace('.in.', '.ans.')
      return [testName, r.output, ansPath]
    })

    test.each(testInputs)('%s', async (_testName, lintOutput, ansPath) => {
      const expectOutput = await fs.readFile(ansPath, 'utf8')
      expect(lintOutput).toEqual(expectOutput)
    })
  })
}

runTestGroup('js')
runTestGroup('ts')
