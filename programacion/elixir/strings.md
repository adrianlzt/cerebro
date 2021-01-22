String.split(foo, "\n")
  nos devuelve un array de elementos partidos por "\n"

[a,b] = String.split("foo,bar", ",")
  a="foo"
  b="bar

Caracter en una posición
String.at("hola", 2)

Longitud string
Strings.length("asda")

Iterar por una string:
String.graphemes("asd") |> Enum.map(fn x -> IO.puts(x) end)

Obtener un slice
String.slice("hola mundo", 2, 6)
"la mun"

