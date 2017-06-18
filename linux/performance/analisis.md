http://techblog.netflix.com/2015/11/linux-performance-analysis-in-60s.html
http://www.brendangregg.com/tsamethod.html
http://techblog.netflix.com/2015/08/netflix-at-velocity-2015-linux.html

# Problem statement (primer paso del análisis)
1.- Por qué pensamos que hay un problema?
2.- El sistema alguna vez ha funcionado bien?
3.- Que ha cambiado? software? hardware? carga?
4.- La degradación de performance puede medirse en términos de latencia o tiempo de ejecucción?
4.- Afecta a otras personas o a las aplicaciones
6.- Cual es el entorno? Que software y hardware se usa? versiones? configuraciones?


# USE method (siguiente paso en el análisis)
http://www.brendangregg.com/usemethod.html
https://www.youtube.com/watch?v=K9w2cipqfvc
https://www.slideshare.net/brendangregg/performance-use-method/13-Example_Summary_What_happened_customer
http://www.brendangregg.com/USEmethod/use-linux.html
https://www.slideshare.net/brendangregg/velocity-stoptheguessing2013/32

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

## Utilización
Depende del tipo de recurso se analizará de forma diferente (storage serán de los dos tipos)
 - recurso I/O (eg: network interface): mediremos el tiempo que está ocupado
   algunas veces tambien podemos usar IOPS/max, o current throughput / max (aunque estos pueden ser un poco trickies)
 - recursos de capacidad (eg: memoria): espacio consumido

100% de uso generalmente indica un bottleneck
>70% suele indicar una bottleneck del recursos I/O (sobre todo cuando trabajos de alta prioridad no pueden interrumpir a trabajos de baja prioridad, como escritura en disco)

Cuidado con la interpretación. Carga del 60% en 5 minutos puede significar una carga del 100% durante 3 minutos y el resto idle.
Intentaremos analizar con resolución de 1" e incluso a veces habrá que bajar a 100ms.

Mejor examinar los dispositivos por separado.


## Saturación
Cualquier valor que no sea 0 añade latencia.
Ejemplos de saturación: cola de procesos en la cpu, o memoria swapeando.

## Errores
Si vemos un error ya deberíamos tener el camino hacia la solución al problema.



# Workload characterizacion (tercer paso tras USE)
Caracterizar la carga que tenemos según:
 - quien la está causando? (PID, UID, IP,etc)
 - por qué se está generando la carga? (seguir el code path)
 - de que tipo es la carga? (IOPS, throughput, read, write, type)
 - como está variando la carga según el tiempo? (hora, dia, semana)

Las mejoras de performance mayores se producen eliminando trabajo innecesario.


# Drill-Down analysis (analizando cada vez más profundo para encontrar el problema)

Ejemplo para un análisis con problemas de latencia I/O:
Application
System Call interface
File system
Block Device Interface
Storage devices drivers
Storage devices

Teniendo acceso al código y usando dynamic tracing vamos a hacer un análisis por pares (usaremos resoluciones de ns).
Iremos analizando trozos de código viendo el tiempo que tarda en ejecutarse entre dos puntos (comienzo y final) y entre otra pareja de puntos de alguna parte del código dentro de la primera pareja de puntos. Ejemplo, miramos el tiempo de ejecucción de una función al completo y por otro lado el de una llamada en particular que realiza esa función.
Los flame graphs pueden ser muy útiles en este caso.




# TSA method
http://www.brendangregg.com/tsamethod.html

Thread State Analysis

Para thread (proceso, hilo, task) mirar cuanto tiempo se tira en cada estado.
Analizar los estados para entender que está haciendo e intentar reducir el tiempo que pasa en esos estados.

Importante tener en mente el esquema de vida de un proceso en linux:
  linux/performance/process_life.png
  linux/performance/thread_states.jpg
  linux/performance/thread_states_linux.jpg
  http://www.brendangregg.com/TSAmethod/processlife_1000.png
  https://image.slidesharecdn.com/linuxbpfsuperpowers-160302200247/95/linux-bpf-superpowers-7-638.jpg?cb=1486871383
  https://image.slidesharecdn.com/linuxbpfsuperpowers-160302200247/95/linux-bpf-superpowers-8-638.jpg?cb=1486871383

Tracemos cuando los procesos se salen de la CPU para intentar entender porque están parando.




# On-CPU
Vamos tomando muestras del estado de la/s CPUs periódicamente, tomando también el stack que ha llevado hasta lo que se está ejecutando en la CPU.
Primera aproximácion, cada segundo mostrar el porcentaje de uso para cada estado por cada CPU:
  mpstat -P ALL 1

Podemos investigar más usando "perf", por ejemplo generando CPU flame graphs (que funciones están cónsumiendo mayor parte de la CPU)



## Off-CPU
http://www.brendangregg.com/offcpuanalysis.html

Tracemos cuando los procesos se salen de la CPU para intentar entender porque están parando. Almacenamos también el stack trace de la función parada.
No siempre es evidente enteder lo que está pasando.

Importante tener en mente el esquema de vida de un proceso en linux:
  linux/performance/process_life.png
  linux/performance/thread_states.jpg
  linux/performance/thread_states_linux.jpg
  http://www.brendangregg.com/TSAmethod/processlife_1000.png
  https://image.slidesharecdn.com/linuxbpfsuperpowers-160302200247/95/linux-bpf-superpowers-7-638.jpg?cb=1486871383
  https://image.slidesharecdn.com/linuxbpfsuperpowers-160302200247/95/linux-bpf-superpowers-8-638.jpg?cb=1486871383

En Linux el estado por sí mismo no nos aporta mucho, pero el code path y el stack trace si nos da información útil

Flame graph: http://www.brendangregg.com/blog/2016-02-01/linux-wakeup-offwake-profiling.html

Ejemplo: si hacemos un tar veremos en el flame graph que parte del tiempo se ha ido leyendo directorios, la mayor parte leyendo ficheros, escritura, fstat, etc

Puede que algunas veces no sea necesario también hacer un "Wakeup flame graph", instrumentando cuando el SO saca un thread de la cola y lo poner a ejecutar.
Por ejemplo:
tar cf - * | gzip > fichero.tgz
En el off-cpu veremos gzip bloqueado por un pipe_wait. Si miramos el wakeup, veremos que gzip estaba esperando a tar.


## Chain graphs
http://www.brendangregg.com/blog/2016-02-05/ebpf-chaingraph-prototype.html
https://gist.github.com/brendangregg/c67039252268ec5e66ba

Chain graphs show why your threads have blocked, along with the entire chain of wakeup stacks that led to their resumption.



# Otras metodologías
Method R: latency-based analysis approach for Oracle databases. Ver "Optimizing Oracle Performance" Cary Millsap y Jeff Holt (2003)
          puede ser usada para otras cosas que no sean databases.

Experimental approaches: pueden ser muy útiles, ejemplo: validando el network throughput usando iperf


# VARIOS
Basicos:
https://image.slidesharecdn.com/dockercon2017performanceanalysis-170419182647/95/container-performance-analysis-24-638.jpg?cb=1492660928
http://techblog.netflix.com/2015/11/linux-performance-analysis-in-60s.html

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
  Nos detalla el consumo por cada CPU. Parte del paquete sysstat
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

linux/performance/guider.md
  herramienta que intenta agregar mucha información y mostrarla de manera sencilla.

linux/tracers/bcc/tools.md
  herramientas de traceo para kernel >= 4.x
  mirar el gráfico para ver que herramienta necesitamos

linux/tracers/perf/perf-tools.md
  herramientas basadas en ftrace y perf

Mirar logs



# Máquina tostada

Mirar cpu:
top

Mirar disco:
iostat

Red?
NFS?
  nfsiostat



