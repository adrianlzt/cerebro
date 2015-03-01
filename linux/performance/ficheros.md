man limits.conf
http://serverfault.com/questions/356962/where-are-the-default-ulimit-values-set-linux-centos
http://tldp.org/LDP/solrhe/Securing-Optimizing-Linux-RH-Edition-v1.3/x4733.html


Definir límites por usuario o proceso de:
máxima apertura de ficheros
consumo de cpu
maximo tamaño de ficheros cores
etc


Nos vale para poner límites a los usuarios, grupos, rangos de usuarios (por UIDs) o rangos de grupos (rango de GIDs).
No vale para limitar procesos o comandos.

En principio esto debería quedar deprecated por cgroups.

ulimit -a
  Mirar límites del usuario actual

Cada usuario e item tiene un limite soft y uno hard (*).
Los limites los asignamos desde /etc/security/limits.conf o /etc/security/limits.d/fichero
nombre/grupo    soft/hard       item            limite

No es necesario reiniciar tras modificar este archivo, pero será necesario que el usuario se vuelva a logear para aplicar los cambios.

Cada usuario puede aumentar su límite soft hasta su hard (*).
Para ver el límite soft: ulimit -Sa
Para ver el límite hard: ulimit -Ha


## Running process
cat /proc/PID/limits


## Opciones

-c or --core-size The maximum size of core files created. By setting this limit to zero, core dumps can be disabled.

-d or --data-size The maximum size of a process's data segment

-f or --file-size The maximum size of files created by the shell

-l or --lock-size The maximum size that may be locked into memory

-m or --resident-set-size The maximum resident set size

-n or --file-descriptor-count The maximum number of open file descriptors (most systems do not allow this value to be set)

-s or --stack-size The maximum stack size

-t or --cpu-time The maximum amount of cpu time in seconds
                 Puede ocupar el 99% de la CPU durante poco tiempo, solo se limita el tiempo de CPU
		 Para un uso más avanzado mirar cpulimit.md

-u or --process-count The maximum number of processes available to a single user

-v or --virtual-memory-size The maximum amount of virtual memory available to the shell. If supported by OS.

