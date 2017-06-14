http://techblog.netflix.com/2015/11/linux-performance-analysis-in-60s.html
http://www.brendangregg.com/tsamethod.html
http://techblog.netflix.com/2015/08/netflix-at-velocity-2015-linux.html

# USE method
http://www.brendangregg.com/usemethod.html
https://www.youtube.com/watch?v=K9w2cipqfvc
https://www.slideshare.net/brendangregg/performance-use-method/13-Example_Summary_What_happened_customer

Utilization Saturation and Errors (USE) 
For every resource, check utilization, saturation, and errors.
No encontrará todos los problemas, pero si la mayoría

Con dynamic tracing y aplicaciones Open Source podemos preguntar al sistema exactamente lo que necesitamos saber.


Para utilizar esta metodología primero debemos listar los recursos involucrados (CPUs, disks, busses, etc)
Para cada recurso analizaremos su uso (tiempo que el recurso está ocupado realizando trabajo)
Saturación, si el recurso está teniendo trabajo extra que no puede sacar a tiempo (colas)
Errores, mirar si está generando algún tipo de error.
Si encontramos algun problema en uso, saturación o errores, investigaremos y veremos si es la causa de nuestro problema.

Recursos hardware: CPUs, main memory, network interfaces, storage devices, controllers, interconnects
Lo mejor es tener el esquema funcional a nivel de hardware. Así podremos seguir el camino de los datos.
Es mejor conocer todos los elementos y saber que algunos no los estamos analizando (tal vez porque no podemos)

Recursos software: mutex locks, thread pools, process/thread capacity, file descriptor capacity

Utilización, depende del tipo de recurso se analizará de forma diferente (storage serán de los dos tipos)
 - recurso I/O (eg: network interface): mediremos el tiempo que está ocupado
   algunas veces tambien podemos usar IOPS/max, o current throughput / max (aunque estos pueden ser un poco trickies)
 - recursos de capacidad (eg: memoria): espacio consumido



# Problem statement method (tipico que se suele hacer, no es un método)
1.- Por qué pensamos que hay un problema?
2.- El sistema alguna vez ha funcionado bien?
3.- Que ha cambiado? software? hardware? carga?
4.- La degradación de performance puede medirse en términos de latencia o tiempo de ejecucción?
4.- Afecta a otras personas o a las aplicaciones
6.- Cual es el entorno? Que software y hardware se usa? versiones? configuraciones?


# VARIOS
Basicos:
https://image.slidesharecdn.com/dockercon2017performanceanalysis-170419182647/95/container-performance-analysis-24-638.jpg?cb=1492660928

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



