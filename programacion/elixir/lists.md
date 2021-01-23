https://hexdocs.pm/elixir/List.html

Lists that are implemented as linked lists.
[1,2,3]

Acceder a un valor:
Enum.at([1,2,3], 0) -> devuelve el valor o nil
Enum.fetch([1,2,3], 0) -> devuelve {:ok/:error, valor}
Enum.fetch!([1,2,3], 0) -> puede generar excepción

Enum.at([1,2,3], -1) => 3
Enum.at([1,2,3], -2) => 2

We can access the head and tail of a list as follows:
[head | tail] = [1,2,3,4,5]
head #=> 1
tail #=> [2,3,4,5]

[head | _] = [1,2,3]
"_" se usa para descartar esa asignación
Tambien podemos usar "_xxx" por darle un nombre aunque no se use


concatenar listas
[1,2,3] ++ [4,5]


Nueva lista añadiendo un elemnto:
x = [1,2,3]
[0, x] # devuelve [0,1,2,3]


Tamaño lista:
length([1,2,3])


Sumar:
Enum.sum([1, 2, 3])


Ordernar:
Enum.sort(ids)

Uniqs:
Enum.uniq(ids)


Aplanar listas nested:
[[1,2], [3,4]] |> List.flatten
  nos dará [1,2,3,4]


Si una lista contiene un elemento:
Enum.member?([1,2,3], 1)
