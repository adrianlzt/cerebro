nums = String.split("1\n2\n", "\n") |> Enum.map(fn x -> String.to_integer(x) end)
Como podría hacer para omitir los errores (le estoy pasando un "" al String.to_integer()
Y si quisiera usar Integer.parse() y solo quedarme con la primera parte (sin el reminder)?


Como abrir un fichero y gestionar que hacemos si hay un error?
Como en go?
{ok, file} = File.open("hello", [:write])
if !ok do
  foo
end

O con cond?


Como funciona "import", que significa esto de ": 2"?
  import MathModule, only: [add: 2, subtract: 2]

