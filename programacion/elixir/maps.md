https://hexdocs.pm/elixir/Map.html#content

genders = %{"david" => "male", "gillian" => "female"}
genders["david"] #=> "male"

Si pedimos una clave que no existe nos devolverá "nil"

También podemos obtener con:
Map.fetch(genders, "david")
  devolverá {:ok, valor}

Map.get(genders, "noexiste", "valor por defecto")



Maps with atom keys can be used like this
genders = %{david: "male", gillian: "female"}
genders.gillian #=> "female"

Otra forma, usando strings como keys:
%{"asd" => 3}

%{:asd => 3} es equivalente a %{asd: 3}

When the key in a key-value pair is an atom, the key: value shorthand syntax can be used



Modificar un map (modificamos una key que ya existe):
%{map | "dos" => 3}
%{map | dos: 3}

Añadir una key (en realidad, generar otro map con lo antiguo más lo nuevo)
Map.put(map, key, value)

Borrar:
Map.delete(map, key)

Iterar por un map
Enum.map(a, fn {k, v} -> IO.puts("k=#{k}, v=#{v}") end)


# Map reduce
Devolvemos una tupla, donde el primer elemento es el "mapped enumerable" y el segundo el acumulador.

Ejemplo, generar un map a partir de una lista de key-values separados por ":"
["foo:bar", "bar:foo"] |> Enum.map_reduce(%{}, fn x, acc ->
  [key, value] = String.split(x, ":")
  {1, Map.put(acc, key, value)}
end)



# MapSet
https://hexdocs.pm/elixir/MapSet.html#content

> MapSet.new([1, :two, {"three"}])
#MapSet<[1, :two, {"three"}]>

> map_set = MapSet.new()
> MapSet.put(map_set, "foo")
#MapSet<["foo"]>


MapSet.size(x)
  tamaño
