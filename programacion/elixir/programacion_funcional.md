Range.new(1,10)
|> Enum.map(fn x -> x * x end)
|> Enum.filter(fn x -> rem(x, 2) == 0 end)


Lo que hace es pasar como primer parámetro la salida de la anterior función y luego un acumulador.
En la respuesta de la función devolveremos {resultado, acumulador}
Cosas equivalentes:
Enum.map_reduce([1, 2, 3], %{}, fn x, acc -> {1, Map.put(acc, x, "1")} end)
[1,2,3] |> Enum.map_reduce(%{}, fn x, acc -> {1, Map.put(acc, x, "1")} end)



pasar una función con map sin tener que crear una función anónima:
File.stream!("input") |> Enum.map(&String.trim/1)

Equivalente, para una función con un solo parámetro:
Enum.map(&Day5.boardingPassSeatID/1)
Enum.map(&Day5.boardingPassSeatID(&1))

Si tuviese dos y solo queremos pasar el segundo:
Enum.map([1,2,3], &String.duplicate("a", &1))
