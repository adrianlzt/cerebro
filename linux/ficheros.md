Información sobre un fichero:
stat fichero


Borrado de fiheros.
Si un proceso mantiene un fichero abierto, y nosotros lo borramos (mientras el proceso continua ejecutándose), el espacio ocupado por dicho fichero no se liberará.
Hay que tener cuidado con este detalle si intentamos borrar ficheros muy grandes para liberar espacio.
La solución es truncar el fichero: echo "" > fichero

Si hubiesemos borrado el fichero.
Miramos el PID del proceso.
Lo chequeamos con lsof -p <PID>
Este nos dirá que el fichero está (deleted)

Entramos en /proc/<PID>/fd
Flusheamos el fichero borrado, apuntando al fd que toque.
Miramos cual es el problemático (son enlaces blandos): ls -la
Fluseamos cat /dev/null > /proc/<PID>/fd/<NUM>


http://www.cyberciti.biz/faq/linux-increase-the-maximum-number-of-open-files/
## Limites de ficheros, sockets, scheduling priority, etc
Para ver todos los límites soft de un usuario (entrando como el usuario)
  ulimit -a

Cada usuario e item tiene un limite soft y uno hard.
Los limites los asignamos desde /etc/security/limits.conf
nombre/grupo	soft/hard	item		limite

No es necesario reiniciar tras modificar este archivo, pero será necesario que el usuario se vuelva a logear para aplicar los cambios.

Cada usuario puede aumentar su límite soft hasta su hard.
Para ver el límite soft: ulimit -Sa
Para ver el límite hard: ulimit -Ha


Otro límite distinto es el del sistema operativo, que lo podemos ver:
cat /proc/sys/fs/file-max
sysctl fs.file-max

Para modificar el dicho tamaño sin persistencia ante reinicios:
sysctl -w fs.file-max=100000

Para que sea persistente, meteremos ese parámetro en /etc/sysctl.conf
fs.file-max = 100000

Y aplicaremos los cambios con:
sysctl -p


## Opciones

-c or --core-size The maximum size of core files created. By setting this limit to zero, core dumps can be disabled.

-d or --data-size The maximum size of a process's data segment

-f or --file-size The maximum size of files created by the shell

-l or --lock-size The maximum size that may be locked into memory

-m or --resident-set-size The maximum resident set size

-n or --file-descriptor-count The maximum number of open file descriptors (most systems do not allow this value to be set)

-s or --stack-size The maximum stack size

-t or --cpu-time The maximum amount of cpu time in seconds

-u or --process-count The maximum number of processes available to a single user

-v or --virtual-memory-size The maximum amount of virtual memory available to the shell. If supported by OS.
