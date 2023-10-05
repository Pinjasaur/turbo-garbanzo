function court (you, judges, quartet) {

  const HEARING_LENGTH = 30

  // I believe this is as efficient as possible for sorting strings
  // https://stackoverflow.com/questions/52030110/sorting-strings-in-descending-order-in-javascript-most-efficiently
  const alphabetical = [you, ...quartet.split(" ")].sort()
  const turn = alphabetical.findIndex(name => name === you)
  console.log(alphabetical, turn)

  // Basic base cases
  if (judges === 1)
    return (turn + 1) * HEARING_LENGTH

  if (judges >= 5)
    return HEARING_LENGTH

  // Compute the quotient and remainder of what your turn is versus how many judges there are
  // There are slight optimizations for computing these: https://stackoverflow.com/questions/4228356/how-to-perform-an-integer-division-and-separately-get-the-remainder-in-javascr
  return Math.floor((turn + 1) / judges) * HEARING_LENGTH + ((turn + 1) % judges * HEARING_LENGTH)

}

console.log(court("Jules", 3, "Adam Betty Frank Mike")) // 60
console.log(court("Jules", 2, "Adam Betty Frank Mike")) // 60
console.log(court("Zane", 1, "Mark Hank Ana Vivian")) // 150
console.log(court("Zane", 4, "Mark Hank Ana Vivian")) // 60
