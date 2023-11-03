import fs from 'node:fs'
import path from 'node:path'
import { format, parse, resolve } from 'node:url'

import externalA from 'external-a'
import externalB from 'external-b'

import localA from './local-a'
import localB from './local-b'
