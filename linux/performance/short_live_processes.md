https://github.com/DominicBreuker/pspy
app en go que permite ver que se está ejecutando en el sistema, sin ser root.
Engancha inotfy en ciertos directorios para pillar lecturas/escrituras de los procesos.
Puede que se le escapen algunos.


forkstat, necesita root (se engancha a fork() y exec())
Esta coge todos los eventos.
Usa el proc event connector: https://lwn.net/Articles/157150/
https://github.com/dbrandt/proc_events
yum install https://download.opensuse.org/repositories/server:/monitoring/RHEL_7/x86_64/forkstat-0.02.12-25.1.x86_64.rpm


Una opción es usar atop (como??)
Otra la herramienta execsnoop de perf-tools o bcc-tools
Programa en perl: https://serialized.net/2010/06/capturing-short-lived-programs-on-linux/
  fuerza bruta ejecutando ps sin parar para los procesos de un usuario (UID). Cuando encuentra alguno le mete strace
Tambien se puede con sysdig
