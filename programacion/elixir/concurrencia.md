Actor model


"spawn", lanzamos un nuevo proceso, nos devuelve el pid

"receive do", implementado en el proceso spawneado, para recibir los datos

"send" para enviar datos a un pid

"self()" para obtener nuestro pid actual

Aunque hablemos de spawn y pids, esto no quiere decir que sean nuevos procesos a nivel linux.

Ejemplo:
defmodule Prueba do
  def echo do
    receive do
      {x} ->
        IO.puts("hola: #{x}")
        echo()
    end
  end
end

pid = spawn(Prueba, :echo, [])
send pid, {2}

Process.sleep(1000)
IO.puts("fin")



# Agents
Process that keeps track of some changing value
Arranca (spawn) otro proceso.

Inicia un agente con los valores que retorne la función (red y green en este caso):
{:ok, my_agent} = Agent.start_link(fn -> ["red", "green"] end)
  my_agent es un PID


Para extraer info de un agente, le pasamos el pid y una función, que tendrá un único parámetro donde se le pasará el valor actual del agente:
Agent.get(my_agent, fn colors -> colors end) #=> ["red", "green"]

Si queremos modificar el valor que almacena el agente:
Agent.update(my_agent, fn colors -> ["blue" | colors] end)
