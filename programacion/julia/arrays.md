a[1] #=> 1 # REMEMBER THAT JULIA INDEXES FROM 1, NOT 0!

# Arrays store a sequence of values indexed by integers 1 through n:
a = Int64[] #=> 0-element Int64 Array

# 1-dimensional array literals can be written with comma-separated values.
b = [4, 5, 6] #=> 3-element Int64 Array: [4, 5, 6]
b[1] #=> 4
b[end] #=> 6

b[2] = 'c' # Convierte el char a Int64 y lo mete en esa posicion

# Add stuff to the end of a list with push! and append!
push!(a,1)     #=> [1]
push!(a,2)     #=> [1,2]
push!(a,4)     #=> [1,2,4]
push!(a,3)     #=> [1,2,4,3]
append!(a,b) #=> [1,2,4,3,4,5,6]

# Remove from the end with pop
pop!(b)        #=> 6 and b is now [4,5]

# Quitar del principio
s=["A","B","C"]
shift(a) #=> "A" and s is now ["B","C"]

# Agregar al principio
unshift!(s,"Z") #=> s is now ["Z","B","C"]


# Function names that end in exclamations points indicate that they modify
# their argument.
arr = [5,4,6] #=> 3-element Int64 Array: [5,4,6]
sort(arr) #=> [4,5,6]; arr is still [5,4,6]
sort!(arr) #=> [4,5,6]; arr is now [4,5,6]


# You can initialize arrays from ranges
a = [1:5] #=> 5-element Int64 Array: [1,2,3,4,5]

# You can look at ranges with slice syntax.
a[1:3] #=> [1, 2, 3]
a[2:] #=> [2, 3, 4, 5]
a[2:end] #=> [2, 3, 4, 5]

# Remove elements from an array by index with splice!
arr = [3,4,5]
splice!(arr,2) #=> 4 ; arr is now [3,5]

# Concatenate lists with append!
b = [1,2,3]
append!(a,b) # Now a is [1, 2, 3, 4, 5, 1, 2, 3]

# Check for existence in a list with in
in(1, a) #=> true

# Examine the length with length
length(a) #=> 8

# Collect
julia> collect(Float64,0:5)
6-element Array{Float64,1}:
 0.0
 1.0
 2.0
 3.0
 4.0
 5.0

julia> collect(Char,0:3)
4-element Array{Char,1}:
   '\0'
 '\x01'
 '\x02'
 '\x03'

