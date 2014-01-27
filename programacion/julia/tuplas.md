# Tuples are immutable.
tup = (1, 2, 3) #=> (1,2,3) # an (Int64,Int64,Int64) tuple.
tup[1] #=> 1
try:
    tup[1] = 3 #=> ERROR: no method setindex!((Int64,Int64,Int64),Int64,Int64)
catch e
    println(e)
end

# Many list functions also work on tuples
length(tup) #=> 3
tup[1:2] #=> (1,2)
in(2, tup) #=> true

# You can unpack tuples into variables
a, b, c = (1, 2, 3) #=> (1,2,3)  # a is now 1, b is now 2 and c is now 3

# Tuples are created even if you leave out the parentheses
d, e, f = 4, 5, 6 #=> (4,5,6)

# A 1-element tuple is distinct from the value it contains
(1,) == 1 #=> false
(1) == 1 #=> true

# Look how easy it is to swap two values
e, d = d, e  #=> (5,4) # d is now 5 and e is now 4
