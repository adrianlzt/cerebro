for a in ("a", "b", "c")
  println(a)
  continue # Para saltar a la siguiente iteraccion
  println("esta linea no se escribira")
end

# For loops iterate over iterables.
# Iterable types include Range, Array, Set, Dict, and String.
for animal=["dog", "cat", "mouse"]
    println("$animal is a mammal")
    # You can use $ to interpolate variables or expression into strings
end


for a in ["dog"=>"mammal","cat"=>"mammal","mouse"=>"mammal"]
    println("$(a[1]) is a $(a[2])")
end

for (k,v) in ["dog"=>"mammal","cat"=>"mammal","mouse"=>"mammal"]
    println("$k is a $v")
end

x = 0
while x < 4
    println(x)
    x += 1
end

http://docs.julialang.org/en/release-0.1/stdlib/base/#iteration
state = start(I)
while !done(I, state)
  (i, state) = next(I, state)
  # body
end
