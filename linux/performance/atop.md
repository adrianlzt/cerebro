http://atoptool.nl/
http://lwn.net/Articles/387202/

Herramienta similar a top pero que muestra en una sola ventana información de procesos, cpus, discos, memoria, etc

Nos muestra información sobre el slab.

Nos permite ver short_live_process (https://github.com/brendangregg/perf-tools/blob/master/execsnoop)
mirar tambien execsnoop de las herramientas de bcc (eBPF). Tambien filelife para short-lived-files
Hace falta ejecutarlo como root y montar el /sys/kernel/debug
mount -t debugfs debugfs /sys/kernel/debug


atopsar -c 5
 ir sacando un resumen del sistema (CPU) cada 5 segundos

# Netatop
http://www.atoptool.nl/netatop.php
Modulo del kernel para registrar que paquetes de red corresponden a cada proceso
