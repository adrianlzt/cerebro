https://elixir-lang.org/getting-started/case-cond-and-if.html


if false and true or false do
  "This will never be seen"
else
  "This will"
end



unless true do
  "This will never be seen"
else
  "This will"
end



# case
case {:one, :two} do
  {:four, :five} ->
    "This won't match"
  {:one, x} ->
    "This will match and bind `x` to `:two` in this clause"
  _ ->
    "This will match any value"
end


Usándolo para diferenciar que dato nos devuelven:
case Integer.parse("123in") do
  {size, "cm"} -> IO.puts "son #{size} centimetros"
  {size, "in"} -> IO.puts "son #{size} pulgadas"
end

# cond
Como muchos if concatenados

cond do
  1 + 1 == 3 ->
    "I will never be seen"
  2 * 5 == 12 ->
    "Me neither"
  1 + 2 == 3 ->
    "But I will"
  true ->
    "But I will (this is essentially an else)"
end


cond do
  p1 == policy_char and p2 != policy_char -> 1
  p1 != policy_char and p2 == policy_char -> 1
  true -> 0
end

