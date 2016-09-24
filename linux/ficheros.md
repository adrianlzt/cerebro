http://www.cyberciti.biz/faq/linux-increase-the-maximum-number-of-open-files/
## Limites de ficheros, sockets, scheduling priority, etc
Para ver todos los límites soft de un usuario (entrando como el usuario)
  ulimit -a

De un proceso:
cat /proc/PID/limits


Mirar performance/ulimit.md

Otro límite distinto es el del sistema operativo, que lo podemos ver:
cat /proc/sys/fs/file-max
sysctl fs.file-max

Para modificar el dicho tamaño sin persistencia ante reinicios:
sysctl -w fs.file-max=100000

Para que sea persistente, meteremos ese parámetro en /etc/sysctl.conf
fs.file-max = 100000

Y aplicaremos los cambios con:
sysctl -p
