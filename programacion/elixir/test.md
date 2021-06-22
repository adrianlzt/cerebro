https://hexdocs.pm/ex_unit/ExUnit.html

Usaremos ficheros .exs

Los tests pueden ir en ficheros en el directorio test/
O integrados en el propio código como "Examples" en el "@doc" en una función.

Generalmente ejecutaremos los tests con:
mix test

Solo ejecutar un test case (podemos ver el fichero y número de línea al ejecutar "mix test" a secas): mix test test/day5_test.exs:17


No se pueden testear funciones privadas. Discusión: https://stackoverflow.com/questions/20949358/is-there-a-way-to-test-private-functions-in-modules-in-exunit-of-elixir


# Coverage
mix test --cover


# Estructura básica
ExUnit.start()

defmodule AssertionTest do
  use ExUnit.Case, async: true  # async=true para ejecutar los test cases en paralelo

  import MathModule  # importamos un module para testearlo

  test "prueba" do
    assert true
  end

  test "suma" do
    assert add(1,1) == 4
  end
end



# Ejemplo tests integrados

@doc """
Hello world.

## Examples

    iex> Day5.hello()
    :world

"""
def hello do
  :world
end
