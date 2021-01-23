https://elixir-lang.org/getting-started/pattern-matching.html


case Integer.parse("123in") do
  {size, "cm"} -> IO.puts "son #{size} centimetros"
  {size, "in"} -> IO.puts "son #{size} pulgadas"
end
