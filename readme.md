[spec](https://hackmd.io/@P5GS4gJVQUyOMmifHuv13g/rkGNqAVla)

HTML Recipes:

- Essentially leveraging the "CSS checkbox hack" e.g.
https://css-tricks.com/the-checkbox-hack/
- Leverage basic BEM syntax for the CSS e.g.
https://css-tricks.com/bem-101/
- Haven't used `line-clamp` much, needed to skim some docs for that property

JavaScript Optimization:

N.B. I did not consider much in the way of "edge cases" e.g. if there's humans
with duplicate names the logic will simply assume you're the first one.

- Initially upon reading the prompt I was thinking something about optimizing
sorting or maybe something to do with a modulo operator.
- Because the array of strings (names) only contains 5 elements and the native
browser `.sort()` performs well I didn't pursue that route. Although there
might be something clever re: avoiding spreading to an array and `.sort`-ing.
- I opted to add several base cases that had return values which were less
computationally expensive.
- Finally, I replaced `Math.floor(a/b)` with `(~~(a/b))` which was noted on
StackOverflow as being ~20% faster in benchmarks. At the obvious cost of
readability.
- To implement basic benchmarks I used `performance.now()` which sounded good
initially but seemed to lack the resolution I would want for a routine like
this that is not terribly complex: most calls were registering at 0ms and even
when averaged over the time for several it was typical for me to see averages
of .2-.4ms.
- My conclusion after all this is I'm not sure there was much to gain in my
attempts to optimize this as there's not much computationally heavy being done.
In a real implementation there would probably be gains by leveraging some form
of caching e.g. memoizing the return value for a set of parameters.
