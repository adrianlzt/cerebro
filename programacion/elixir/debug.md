https://elixir-lang.org/getting-started/debugging.html


IO.puts("hola #{foo}")

Ver contenido de cualquier tipo de variable
IO.inspect(variable)

(1..10)
|> IO.inspect
|> Enum.map(fn x -> x * 2 end)



Como "breakpoint()" en python, pero abre el repl, no el debugger
Meter en una parte del código:
require IEx; IEx.pry

Y ejecutar el código con iex.
Cuando llegue a esa línea se parará el código y nos meterá en el repl


# Debugger line-by-line
iex
> c "foo.ex"
> :debugger.start()


# Observer
For debugging complex systems, jumping at the code is not enough. It is necessary to have an understanding of the whole virtual machine, processes, applications, as well as set up tracing mechanisms. Luckily this can be achieved in Erlang with :observer. In your application:
