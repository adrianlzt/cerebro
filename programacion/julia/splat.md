# The ... is called a splat.
# We just used it in a function definition.
# It can also be used in a fuction call,
# where it will splat an Array or Tuple's contents into the argument list.
Set([1,2,3])    #=> Set{Array{Int64,1}}([1,2,3]) # produces a Set of Arrays
Set([1,2,3]...) #=> Set{Int64}(1,2,3) # this is equivalent to Set(1,2,3)

x = (1,2,3)     #=> (1,2,3)
Set(x)          #=> Set{(Int64,Int64,Int64)}((1,2,3)) # a Set of Tuples
Set(x...)       #=> Set{Int64}(2,3,1)


Es como "aplastar" un array o tupla y dejarlo en sus componentes.
