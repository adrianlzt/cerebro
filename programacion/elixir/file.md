https://elixir-lang.org/getting-started/io-and-the-file-system.html

iex> {:ok, file} = File.open("hello", [:write])
{:ok, #PID<0.47.0>}
iex> IO.binwrite(file, "world")
:ok
iex> File.close(file)
:ok
iex> File.read("hello")


file = File.open!("/foo/bar")
  excepción si no puede abrir el fichero


Lee todo el contenido del fichero y lo mete en la variable "content" como una string.
{:ok, content} = File.read("input")


Leer por líneas directamente como un stream
File.stream!("input") |> Enum.map(fn x -> x end)

Para quitarle los caracteres de cambio de linea
File.stream!("input") |> Enum.map(&String.trim/1)


# ls
File.ls("/etc")
