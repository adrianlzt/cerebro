División con resultado float
3/5

División con resultado int
div(10, 2) #=> 5

Kernel.round(9/5) => 5
  acepta integers y float, devuelve siempre integer

Kernel.trunc(4.99) => 4
  truncar al integer inferior

To get the division remainder use `rem`
rem(10, 3) #=> 1


Comparación de valores:
1 == 1.0  #=> true

Comparación de valores y tipos:
1 === 1.0 #=> false



# Cast
https://hexdocs.pm/elixir/Integer.html#parse/1
https://hexdocs.pm/elixir/Float.html#parse/1
{integer, remainder_of_binary} = Integer.parse("23sec")
  integer = 23
  remainder_of_binary = sec

Float.parse("34.25")

Devolverá "error" si no puede parsear


También podemos convertir una string a int con
String.to_intenger

Convertir una lista separada por comas (string) a integers:
String.split(policy_repeat, ",") |> Enum.map(fn x -> String.to_integer(x) end)

