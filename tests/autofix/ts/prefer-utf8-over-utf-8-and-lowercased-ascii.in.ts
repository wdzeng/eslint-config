// Please also update JS/TS test if you are changing this file.

import fs from 'node:fs'
import fsp from 'node:fs/promises'

export async function readFoo() {
  let buf
  let content

  buf = fs.readFileSync('./foo.txt', 'UTF-8')
  buf = fs.readFileSync('./foo.txt', 'UTF8')
  buf = fs.readFileSync('./foo.txt', 'utf-8')
  buf = fs.readFileSync('./foo.txt', 'ASCII')

  buf = await fsp.readFile('./foo.txt', 'UTF-8')
  buf = await fsp.readFile('./foo.txt', 'UTF8')
  buf = await fsp.readFile('./foo.txt', 'utf-8')
  buf = await fsp.readFile('./foo.txt', 'ASCII')

  // Not autofixable.

  // fs.writeFileSync('./foo.txt', 'content', 'UTF-8')
  // fs.writeFileSync('./foo.txt', 'content', 'UTF8')
  // fs.writeFileSync('./foo.txt', 'content', 'utf-8')
  // fs.writeFileSync('./foo.txt', 'content', 'ASCII')

  // await fsp.writeFile('./foo.txt', 'content', 'UTF-8')
  // await fsp.writeFile('./foo.txt', 'content', 'UTF8')
  // await fsp.writeFile('./foo.txt', 'content', 'utf-8')
  // await fsp.writeFile('./foo.txt', 'content', 'ASCII')

  // content = buf.toString('UTF-8')
  // content = buf.toString('UTF8')
  // content = buf.toString('utf-8')
  // content = buf.toString('ASCII')

  return [buf, content]
}
