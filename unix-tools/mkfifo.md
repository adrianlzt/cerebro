https://linux.die.net/man/3/mkfifo

Son unos ficheros especiales que implementan una cola fifo.

Ejemplo:
mkfifo cola
echo "asd" > cola
  el comando se queda bloqueando, porque no hay nadie leyendo

en otra terminal:
cat < cola
