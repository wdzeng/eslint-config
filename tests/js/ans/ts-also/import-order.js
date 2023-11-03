import fs from 'node:fs'
import path from 'node:path'
import { domainToUnicode, format, pathToFileURL } from 'node:url'

import externalA from 'external-a'
import externalB from 'external-b'

import localA from './local-a'
import localB from './local-b'

// Just use them so ESLint does not complain.
console.log(localA, externalB, path, localB, externalA, fs, pathToFileURL, format, domainToUnicode)
