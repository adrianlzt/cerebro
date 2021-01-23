Es la forma de agrupar funciones

defmodule Math do
  @moduledoc """
  This is a built-in attribute on a example module.
  """
  @my_data 100 # This is a custom attribute.

  def sum(a, b) do
    a + b
  end

  def square(x) do
    x * x

  # Este métdo es privado
  defp do_sum(a, b) do
    a + b
  end end

  def area({:rectangle, w, h}) do
    w * h
  end

  # podemos definir el mismo método con distintos parámetros, se usará el que haga match (multiples clauses)
  # y también poner "guards" (condicionales en la función)
  def area({:circle, r}) when is_number(r) do
    3.14 * r * r
  end
end

Math.sum(1, 2)  #=> 3
Math.square(3) #=> 9


Compilar un módulo:
elixirc prueba.ex

Genera un fichero: Elixir.Prueba.beam
