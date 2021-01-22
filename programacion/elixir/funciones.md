# Funciones anónimas
sum = fn (a, b) -> a + b end

sum.(2,3)
  NOTAR el punto para llamar a una función


Funciones con distintos parámetros de entrada:
handle_result = fn
  {:ok, result} -> IO.puts "Handling result..."
  {:ok, _} -> IO.puts "This would be never run as previous will be matched beforehand."
  {:error} -> IO.puts "An error has occurred!"
end


No existe "return", por lo que tendremos que meter los condicionales "hasta el final" (no vale el "truco" de comprobar un condicinonal y salirse en ese punto)

El último valor será el valor retornado


{:ok, file} = File.open("hello", [:write])
Falla si el primer parámetro no es :ok

Podemos hacerlo de otra manera:
{status, file} = File.open("hello", [:write])
  status tendrá valor :ok o :error en caso de fallo
  en caso de fallo, en "file" tendremos el tipo de error, por ejemplo :enoent



f = fn
  x, y when x > 0 -> x + y
  x, y -> x * y
end


# Formas de definir funciones
def add(x, y), do: x + y

def subtract(x, y) do
  x - y
end

