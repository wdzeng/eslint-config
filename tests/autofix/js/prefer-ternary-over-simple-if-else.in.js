// Please also update JS/TS test if you are changing this file.

// Not working.
// export function returnCase(a) {
//   if (a) {
//     return 1
//   } else {
//     return 0
//   }
// }

export function* yieldCase(a) {
	if (a) {
		yield 1
	} else {
		yield 0
	}
}

export function throwCase(a) {
	if (a) {
    throw new Error('true')
	} else {
    throw new Error('false')
	}
}
