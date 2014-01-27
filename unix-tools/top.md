M - ordenar por uso de memoria
1 - mostrar el uso de todas las CPUs
c - mostrar el path de los comandos
A - 'alternate display', muestra cuatro ventanas mostrando distinta info
k - matar un proceso (nos pregunta el pid)
s - cambiar intervalo de refresco
h - ayuda
W - guarda la configuración que hayamos hecho en ~/.toprc

vsz         VSZ       virtual memory size of the process in KiB (1024-byte units).  Device mappings are currently excluded; this is subject to change.  (alias vsize)
rss         RSS       resident set size, the non-swapped physical memory that a task has used (inkiloBytes).  (alias rssize, rsz)
NI  --  Nice Value: The nice value of the task.  A negative nice value means higher priority, whereas a positive nice value means lower priority.
PR  --  Priority: The scheduling priority of the task.  If you see 'rt' in this field, it means the task is running under 'real time' scheduling priority.
