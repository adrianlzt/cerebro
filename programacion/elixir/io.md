IO.puts("hola #{foo}")
IO.puts(:stderr, "hola #{foo}")

IO.inspect(foo)

foo = IO.gets("yes or no? ")
