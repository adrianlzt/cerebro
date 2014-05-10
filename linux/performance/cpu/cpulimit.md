yum install cpulimit
apt-get update cpulimit

man cpulimit (solo en ubuntu)

Limita por proceso o comando.

cpulimit -p 345 -l 50
  Limita el pid 345 para que no consuma más del 50% de la CPU


Funciona enviando las señales SIGSTOP y SIGCONT de manera muy rápida.

