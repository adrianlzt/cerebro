No hace falta declaración previa:
var = 5

# Accessing a previously unassigned variable is an error
try
  some_other_var #=> ERROR: some_other_var not defined
catch e
    println(e)
end

# Variable names start with a letter.
# After that, you can use letters, digits, underscores, and exclamation points.
Some_Other_Var123! = 6

# You can also use unicode characters
☃ = 8 #=> 8
# These are especially handy for mathematical notation
2 * π #=> 6.283185307179586
