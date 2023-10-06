function court (you, judges, quartet) {

  // from the spec
  const HEARING_LENGTH = 30

  // This is seemingly quite efficient for sorting strings
  // https://stackoverflow.com/questions/52030110/sorting-strings-in-descending-order-in-javascript-most-efficiently
  const order = [you, ...quartet.split(" ")].sort()
  const turn = order.findIndex(name => name === you) + 1

  // NOTE: I've been trying out logfmt [0] / canonical [1] style logging
  // [0]: https://brandur.org/logfmt
  // [1]: https://stripe.com/blog/canonical-log-lines
  console.debug(`you=${you} judges=${judges} quartet="${quartet}" order="${order.join(" ")}" turn=${turn}`)

  // Base case: only 1 judge
  if (judges === 1)
    return turn * HEARING_LENGTH

  // Base cases: more judges than humans or your turn will be in the first "rotation"
  if (judges >= 5 || turn <= judges)
    return HEARING_LENGTH

  // Compute the quotient and remainder of what your turn is versus how many judges there are
  // Slight perf optimization vs Math.floor: https://stackoverflow.com/questions/4228356/how-to-perform-an-integer-division-and-separately-get-the-remainder-in-javascr
  return ((~~(turn / judges)) * HEARING_LENGTH) + ((turn % judges) * HEARING_LENGTH)

}

console.debug(court("Jules", 3, "Adam Betty Frank Mike")) // 60
console.debug(court("Jules", 2, "Adam Betty Frank Mike")) // 60
console.debug(court("Jules", 1, "Adam Betty Frank Mike")) // 120
console.debug(court("Zane", 1, "Mark Hank Ana Vivian")) // 150
console.debug(court("Zane", 4, "Mark Hank Ana Vivian")) // 60
console.debug(court("Paul", 4, "Alpha Bravo Foxtrot Whiskey")) // 30
console.debug(court("Alpha", 2, "Bravo Charlie Delta Echo")) // 30
console.debug(court("Charlie", 1, "Alpha Bravo Delta Echo")) // 90
