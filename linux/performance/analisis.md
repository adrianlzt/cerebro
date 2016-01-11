http://techblog.netflix.com/2015/11/linux-performance-analysis-in-60s.html
http://www.brendangregg.com/usemethod.html
http://www.brendangregg.com/tsamethod.html
http://techblog.netflix.com/2015/08/netflix-at-velocity-2015-linux.html

cat /proc/cpuinfo | grep processor
  numero de procesadores en el servidor. Nos servirá para comprender mejor la carga de cpu

uptime
  visión rápida de si tenemos carga, y como está variando

dmesg | tail
  chequear por si ha saltado algún call trace, oom, tcp dropping, etc

vmstat 1
  resumen cada segundo
  la primera linea es un resumen desde el arranque del sistema
  r: procesos esperando (no incluye I/O). Si tenemos r > num_cpus estamos saturados
  free: memoria libre en KBs
  si, so: swap-in, swap-out, si no son cero estamos sin memoria

  Time: media de todas las CPUs (porcentaje que gasta cada uno)
  us: user time
  sy: system time (> 20%, necesita investigación, probablemente el kernel está procesando el I/O ineficientemente)
  id: idle time
  wa: waiting I/O time (valor constante -> disk bottleneck)
  st: stolen time (by other guests)

mpstat -P ALL 1
  Nos detalla el consumo por cada CPU
  Una única cpu muy tostada indicará un proceso single-threaded causando el problema

pidstat 1
  Nos da una visión rápida de procesos que se pueden estar comiendo la CPU
  El porcentaje de CPU puede pasar del 100% si tenemos varias CPUs (200% sería comiendo dos CPUs al completo)

iostat -xz 1
  uso de los dicos
  r/s, w/s: lecturas y escrituras realizadas
  rkB/s, wkB/s: lecturas y escrituras en KBytes por segundo
  await: media del tiempo de espera I/O. Es el tiempo que las app deben esperar. Suma tiempo encolado + tiempo en servir
         valores altos indican disco saturado o con problemas
  avgqu-sz: media de peticiones a un disco. Valores >1 suelen indicar saturación
            Algunos dispositivos (sobre todo virtuales) pueden procesar varias peticiones en paralelo, al tener varios discos fisicos detras
  %util: nos muetra cuanto tiempo el disco está ocupado. >60% generan mala performance. ~100% indica saturación

free -m
  linux/performance/memoria/free.md

sar -n DEV 1
  network interface throughput
  Mirar que no nos estamos acercando cerca de algún límite físico (por ejemplo de una tarjeta de 100Mbps)
  Recordar convertir MBs a Mbits
  %ifutil for device utilization (max of both directions for full duplex). En algunas versiones no funciona

sar -n TCP,ETCP 1
  active/s: Number of locally-initiated TCP connections per second (e.g., via connect()). Conexiones salientes
  passive/s: Number of remotely-initiated TCP connections per second (e.g., via accept()). Conexiones entrantes
  retrans/s: Number of TCP retransmits per second. Problemas por redes no fiables (internet) o sobrecarga que provoca pérdidas de paquetes
  Al salir (C^c) nos dará el resumen

top

iftop
  nos permite ver el consumo de red. Pone la interfaz en modo promiscuo

Mirar logs



# Máquina tostada

Mirar cpu:
top

Mirar disco:
iostat

Red?
NFS?
  nfsiostat
