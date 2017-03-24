http://atoptool.nl/
http://lwn.net/Articles/387202/

Herramienta similar a top pero que muestra en una sola ventana información de procesos, cpus, discos, memoria, etc
Por defecto nos muestra cada 10s un estado de los procesos que se han "movido".
También muestra los procesos que comenzaron y terminaron entre esos 10s (vemos los shortlived process)

Al instalarlo también se instala un service que se dedic a recolectar las metricas del sistema (systemctl status atop)
Va almacenando en /var/log/atop/ 30 días de métricas

También tiene otro demonio, atopacctd, para hacer el process accounting (similar a acct/psacct)


Si arrancamos atop como root, en la parte superior derecha veremos un contador de procesos que han terminado entre el periodo de refresco
(no me funciona en arch)

Mirando strace, al arrancar intenta leer /var/run/pacct_shadow.d/current, si no lo encuentra, /var/log/pacct, tambien prueba /var/account/pacct
Si todos esos fallan, parece que abre el suyo propio: /tmp/atop.d/atop.acct

Si tenemos corriendo atopacctd, lee el fichero /var/run/pacct_shadow.d/current, pero aún así no me dice los procesos exited


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
