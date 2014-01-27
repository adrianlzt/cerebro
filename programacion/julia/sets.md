# Use Sets to represent collections of unordered, unique values
empty_set = Set() #=> Set{Any}()
# Initialize a set with values
filled_set = Set(1,2,2,3,4) #=> Set{Int64}(1,2,3,4)

# Add more values to a set
push!(filled_set,5) #=> Set{Int64}(5,4,2,3,1)

# Check if the values are in the set
in(2, filled_set) #=> true
in(10, filled_set) #=> false

# There are functions for set intersection, union, and difference.
other_set = Set(3, 4, 5, 6) #=> Set{Int64}(6,4,5,3)
intersect(filled_set, other_set) #=> Set{Int64}(3,4,5)
union(filled_set, other_set) #=> Set{Int64}(1,2,3,4,5,6)
setdiff(Set(1,2,3,4),Set(2,3,5)) #=> Set{Int64}(1,4)
