/* eslint-disable @typescript-eslint/no-unused-vars */
// Please also update JS/TS test if you are changing this file.

import fs from 'node:fs/promises'

const packageJson1 = JSON.parse(await fs.readFile('./package.json')) as unknown

const promise = fs.readFile('./package.json')
const packageJson2 = JSON.parse(await promise) as unknown
