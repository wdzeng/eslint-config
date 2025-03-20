// Please also update JS/TS test if you are changing this file.
/* eslint-disable capitalized-comments */
/* eslint-disable @typescript-eslint/no-unused-expressions */
// TODO: check some example can be fixable in the future release of eslint-plugin-unicorn.

export default function (foo: unknown) {
  // foo instanceof String // not working
  // foo instanceof Number // not working
  // foo instanceof Boolean // not working
  // foo instanceof BigInt // not working
  // foo instanceof Symbol // not working
  foo instanceof Array
  foo instanceof Function
  // foo instanceof Object // not working
}
