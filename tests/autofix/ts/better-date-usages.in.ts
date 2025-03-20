// Please also update JS/TS test if you are changing this file.
/* eslint-disable no-unused-expressions */

export function cloneDate(date) {
  return new Date(date.getTime())
}

export function showUseNow() {
  +new Date
  new Date().getTime()
  new Date().valueOf()
  Number(new Date())
  new Date() * 2
}
