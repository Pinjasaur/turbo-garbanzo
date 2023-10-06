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

function perf (you, judges, quartet) {
  const now = performance.now()
  const time = court(you, judges, quartet)
  console.debug(`${time} which took ${performance.now() - now}ms to compute`)
}

const now = performance.now()
perf("Test", 2, "Uno Dos Tres Quatro") // 60
perf("Jules", 3, "Adam Betty Frank Mike") // 60
perf("Jules", 2, "Adam Betty Frank Mike") // 60
perf("Jules", 1, "Adam Betty Frank Mike") // 120
perf("Zane", 1, "Mark Hank Ana Vivian") // 150
perf("Zane", 4, "Mark Hank Ana Vivian") // 60
perf("Zane", 5, "Mark Hank Ana Vivian") // 30
perf("Paul", 4, "Alpha Bravo Foxtrot Whiskey") // 30
perf("Alpha", 2, "Bravo Charlie Delta Echo") // 30
perf("Charlie", 1, "Alpha Bravo Delta Echo") // 90
console.debug(`After 10 executions the average (mean) time was ${(performance.now() - now) / 10}ms`)
