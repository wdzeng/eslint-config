// Please also update JS/TS test if you are changing this file.

// Should use for-loop instead of forEach.
export function splitCharactersAndLog(s, delimiter) {
  for (const char of s.split(delimiter)) {
    console.log(char)
  }
}
