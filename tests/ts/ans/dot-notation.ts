interface HasPoop {
  poop: unknown
}

export function getPoop(a: HasPoop): unknown {
  // Should be a.poop
  return a.poop
}
