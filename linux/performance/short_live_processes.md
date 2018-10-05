Una opción es usar atop (como??)
Otra la herramienta execsnoop de perf-tools o bcc-tools
Programa en perl: https://serialized.net/2010/06/capturing-short-lived-programs-on-linux/
  fuerza bruta ejecutando ps sin parar para los procesos de un usuario (UID). Cuando encuentra alguno le mete strace
Tambien se puede con sysdig
