// Please also update JS/TS test if you are changing this file.
/* eslint-disable n/no-missing-import */
/* eslint-disable import-x/extensions */
/* eslint-disable no-unused-vars */

import fs from 'node:fs'
import path from 'node:path'

import ExternalA from 'external-a'
import ExternalB from 'external-b'

import Index from '.'
import SiblingA from './sibling-a'
import SiblingB from './sibling-b'
import GrandParentA from '../grand-parent-a'
import GrandParentB from '../grand-parent-b'
import ParentA from '../parent-a'
import ParentB from '../parent-b'
