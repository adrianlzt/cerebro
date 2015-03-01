Saca PIDs buscando por usuario, regexp, etc.
Tambíen saca los PIDs excepto los que matchen.
También nos puede sacar el nombre del comando ejecutado

pgrep -P PID
  nos dice los childs de PID

pgrep PATTERN
  nos busca el pid

pgrep -f PATTERN
  busca el pattern en toda la linea de ejecucción
