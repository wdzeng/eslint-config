// Please also update JS/TS test if you are changing this file.
/* eslint-disable no-unused-vars */

import fs from 'node:fs/promises'

const packageJson1 = JSON.parse(await fs.readFile('./package.json'))

const promise = fs.readFile('./package.json')
const packageJson2 = JSON.parse(await promise)
