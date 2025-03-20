// Please also update JS/TS test if you are changing this file.

const firstElement = 'first'
const secondElement = 'second'
const thirdElement = 'third'
const f1 = (a, b, c) => a + b + c
function* f2() {
  yield firstElement
}

const array = [firstElement, secondElement, thirdElement]
export const object = { firstElement, secondElement, thirdElement }
f1(firstElement, secondElement, thirdElement)
const set = new Set(array)
export const results = await Promise.all(array)

for (const e of set) {
  console.log(e)
}

export function* g() {
  yield* f2()
}

export function h(arr) {
  return arr.map((x) => x * 2)
}
