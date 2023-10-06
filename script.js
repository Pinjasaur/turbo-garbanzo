function court (you, judges, quartet) {

  // from the spec
  const HEARING_LENGTH = 30

  // I believe this is as efficient as possible for sorting strings
  // https://stackoverflow.com/questions/52030110/sorting-strings-in-descending-order-in-javascript-most-efficiently
  const order = [you, ...quartet.split(" ")].sort()
  const turn = order.findIndex(name => name === you) + 1
  console.debug(`you=${you} judges=${judges} quartet="${quartet}" order="${order.join(" ")}" turn=${turn}`)

  // Base case: only 1 judge
  if (judges === 1)
    return turn * HEARING_LENGTH

  // Base cases: more judges than humans or your turn will be in the first "rotation"
  if (judges >= 5 || turn <= judges)
    return HEARING_LENGTH

  // Compute the quotient and remainder of what your turn is versus how many judges there are
  // There are slight optimizations for computing these: https://stackoverflow.com/questions/4228356/how-to-perform-an-integer-division-and-separately-get-the-remainder-in-javascr
  return (Math.floor(turn / judges) * HEARING_LENGTH) + ((turn % judges) * HEARING_LENGTH)

}

console.log(court("Jules", 3, "Adam Betty Frank Mike")) // 60
console.log(court("Jules", 2, "Adam Betty Frank Mike")) // 60
console.log(court("Zane", 1, "Mark Hank Ana Vivian")) // 150
console.log(court("Zane", 4, "Mark Hank Ana Vivian")) // 60
