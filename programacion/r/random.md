http://en.wikibooks.org/wiki/R_Programming/Random_Number_Generation

> sample(1:6,10,replace=T)
 [1] 2 5 5 5 3 4 1 4 4 6
     If ‘replace’ is false, these probabilities are applied
     sequentially, that is the probability of choosing the next item is
     proportional to the weights amongst the remaining items.  The
     number of nonzero weights must be at least ‘size’ in this case.
> sample(seq(1,10,0.1),10,replace=T)
 [1] 2.1 9.0 3.6 1.9 3.4 5.2 4.8 9.4 8.1 6.6


> runif(1)
[1] 0.5568894
> runif(2)
[1] 0.6195540 0.3463061
