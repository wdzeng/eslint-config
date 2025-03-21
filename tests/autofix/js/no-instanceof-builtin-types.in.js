// Please also update JS/TS test if you are changing this file.
/* eslint-disable no-unused-expressions */
/* eslint-disable capitalized-comments */

export default function (foo) {
  // TODO: some auto-fixings are not working (commented); check if they will be fixed in the future.

  foo instanceof String // not working
  foo instanceof Number // not working
  foo instanceof Boolean // not working
  foo instanceof BigInt // not working
  foo instanceof Symbol // not working
  foo instanceof Array
  foo instanceof Function
  foo instanceof Object // not working
}
