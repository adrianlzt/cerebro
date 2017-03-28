http://atoptool.nl/
http://lwn.net/Articles/387202/

Herramienta similar a top pero que muestra en una sola ventana información de procesos, cpus, discos, memoria, etc
Por defecto nos muestra cada 10s un estado de los procesos que se han "movido".
También muestra los procesos que comenzaron y terminaron entre esos 10s (vemos los shortlived process)

Al instalarlo también se instala un service que se dedic a recolectar las metricas del sistema (systemctl status atop)
Va almacenando en /var/log/atop/ 30 días de métricas

También tiene otro demonio, atopacctd, para hacer el process accounting (similar a acct/psacct) -> es la forma preferia para tener datos sobre procesos terminados.


Si arrancamos atop como root, en la parte superior derecha veremos un contador de procesos que han terminado entre el periodo de refresco
(no me funciona en arch). Puede que sea por estos bugs: https://lkml.org/lkml/2016/12/19/182

Mirando strace, al arrancar intenta leer /var/run/pacct_shadow.d/current, si no lo encuentra, /var/log/pacct, tambien prueba /var/account/pacct
Si todos esos fallan, parece que abre el suyo propio: /tmp/atop.d/atop.acct
Si tenemos corriendo atopacctd, lee el fichero /var/run/pacct_shadow.d/current, pero aún así no me dice los procesos exited
  ---> Explicado en la man page


Nos muestra información sobre el slab.

Nos permite ver short_live_process (https://github.com/brendangregg/perf-tools/blob/master/execsnoop)
mirar tambien execsnoop de las herramientas de bcc (eBPF). Tambien filelife para short-lived-files
Hace falta ejecutarlo como root y montar el /sys/kernel/debug
mount -t debugfs debugfs /sys/kernel/debug



# atop
Comenzar a almacenar datos de los procesos en un fichero cada 5s (captura short lived procs)
atop -w atop.data 5
  los procesos que empiezen entre el último intervalo y la parada de atop los perderemos (si no se termina un intervalo, no almacena info)

leer el fichero
atop -t atop.data

t siguiente captura
T anterior captura

P regex por nombre del proceso
U buscar por nombre de user
I seleccionar por PID

v mostrar datos del proceso (start and end time, comand, etc)


## Analizar short lived procs
Arrancamos el atop con un intervalo mas pequeño, por ejemplo:
atop 3

En la casilla superior derecha veremos algo como: # exit NNN
Eso nos dirá la cantidad de procesos que han terminado en los últimos 3 segundos.

Pulsamos dos veces 'f' para limitar la cantidad de datos agregados (el menu superior).
Tambien podemos pulsar 'l' y poner a 0 los campos para deducir más el menú superior.

Pulsamos 'p' para ver la información agregada por proceso. No podemos ordenar por número de procesos.
Podemos parar atop 'z', e ir mirando las distintas páginas de procesos (Control+f Control+b)

Pulstamos 'P' para escribir una expresion regular aplicada sobre el nombre de los procesos.

Pulsamos 'v' para ver más datos de los procesos (parent pid, uid, gid, etc)



# atopsar

atopsar -c 5
 ir sacando un resumen del sistema (CPU) cada 5 segundos

atopsar -r 20170324 -b 12:00 -e 12:12 -GOND
  analizamos el dia 20170324 entre las 12:00 y las 12:12 (por defecto almacena datos cada 10')
  nos devuelve un top 3 consumidores de: memoria (G), cpu (O), network (N) y disco (D)o



# Netatop
http://www.atoptool.nl/netatop.php
Modulo del kernel para registrar que paquetes de red corresponden a cada proceso
