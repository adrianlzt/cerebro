Saca PIDs buscando por usuario, regexp, etc.
Tambíen saca los PIDs excepto los que matchen.
También nos puede sacar el nombre del comando ejecutado

pgrep -P PID
  nos dice los childs de PID

pgrep PATTERN
  nos busca el pid

pgrep -f PATTERN
  busca el pattern en toda la linea de ejecucción (en /proc/PID/cmdline)
  está limitado a 4096 bytes en el codigo de pgrep https://gitlab.com/procps-ng/procps/blob/master/pgrep.c#L502
  char cmdline[CMDSTRSIZE] = "";
  #define CMDSTRSIZE 4096
