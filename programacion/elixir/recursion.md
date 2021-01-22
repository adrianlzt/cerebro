Elixir es inmutable (extender esto TODO).
Se usa mucho la recursion, ejemplo:

defmodule Recursion do
  def sum_list([head | tail], acc) do
    sum_list(tail, acc + head)
  end

  def sum_list([], acc) do
    acc
  end
end

Recursion.sum_list([1,2,3], 0) #=> 6
