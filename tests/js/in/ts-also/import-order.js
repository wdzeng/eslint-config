import localA from './local-a'
import externalB from 'external-b'
import path from 'node:path'
import localB from './local-b'
import externalA from 'external-a'
import fs from 'node:fs'
import { pathToFileURL, format, domainToUnicode } from 'node:url'

// Just use them so ESLint does not complain.
console.log(localA, externalB, path, localB, externalA, fs, pathToFileURL, format, domainToUnicode)
