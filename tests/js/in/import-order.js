/* eslint-disable import/no-unresolved */

import localA from './local-a'
import externalB from 'external-b'
import path from 'node:path'
import localB from './local-b'
import externalA from 'external-a'
import fs from 'node:fs'
import { format, parse, resolve } from 'node:url'