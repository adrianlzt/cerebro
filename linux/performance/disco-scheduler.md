Planificador, se intenta buscar un balance entre
  Fariness: repartir acceso a disco entre procesos
  Performance: servir primero los accesos a áreas cercanas

  Realtime (tareas terminen en plazo)
    evitar jitter
    ejemplo: vídeo

Los planificador se aplican por disco (no por partición)

Comparativa: http://www.phoronix.com/scan.php?page=article&item=linux-412-io


Scheduler "ascensor": http://en.wikipedia.org/wiki/Elevator_algorithm
  el disco se mueve desde fuera a dentro (o viceversa).
  las peticiones que se encuentren en este camino se van sirviendo
  luego se mueve en el sentido opuesto y se van sirviendo las peticiones que estén en el camino

Scheduler deadline:
  variación del ascensor
  todas las peticiones tienen que tener un acceso menor 5ms.
  si alguna peticion va a sobrepasar esos 5ms, se hace una excepción y se ejecuta antes
  es un algoritmo simple, no carga la CPU
  es bueno para el realtime
  es el por defecto en Ubuntu
  Params (/sys/block/sda/queue/iosched):
    write/read_expire: tiempo que cuando se va a cumplir cuelas en la cola a la petición. Por defecto 500ms
    fifo_batch:
    front_merges: recorrer un fichero al revés. Se puede desactivar si estamos seguros que no vamos a recorrer los ficheros de esa manera
                  sería más rápido el algoritmo, pero la ganancia será muy pequeña
    back_seek_penalty: cuanto más costoso es ir a un sector que tenemos detrás (tenemos que dar la vuelta al disco)

Scheduler noop:
  FIFO
  el más sencillo, sin carga
  lo mejor para VM, SSD, Raid y para aplicaciones intensivas en CPU
  para un disco rotacional no es bueno

Scheduler anticipatory (deprecated):
  sigue el algoritmo del ascensor, pero intenta adivinar que es lo que va a pasar.
  normalmente se queda esperando en una zona porque seguramente otra de las próximas peticiones esté cerca
  mejora responisividad, pero puede producir jitter (variación entre respuestas alto)

Scheduler CFQ: http://en.wikipedia.org/wiki/CFQ
  no se basa en el algoritmo ascensor
  se basa en un sistema de colas
  colas donde el primer elemento en recibir IO es el que menos "slices" ha recibido
  tiene clases de tráfico y prioridades (podemos dar prioridad a un proceso, darle más quota. Comando ionice)
  mejora fairness, buena responsividad y realtime
  scheduler por defecto en redhat
  Params (/sys/block/sda/queue/iosched):
    quantum: numbers of IOPS send to disk
    slice_idle: cuanto esperar para nuevas peticiones que mergear
    low_latency: trata de dar funcionalidad de deadline a cfq. Si se pone a 1 intenta garantizar un max wait de 300ms

Scheduler BFQ: http://algo.ing.unimo.it/people/paolo/disk_sched/
  bucket fair queueing
  es como CFQ pero en vez de por cuotas de tiempo, por cuotas de bytes
  seguramente aparezca en el kernel 3.16 (http://www.phoronix.com/scan.php?px=MTYyNDU&page=news_item)

Kyber (facebook):
  https://lwn.net/Articles/720071/
  I/O scheduler for multiqueue devices


Scheduler SIO:
  mezcla entre noop y deadline
  hace algún merge. Es un noop un pelín más complicado

Máquinas virtuales:
  lo mejor es que el planificador esté en las VM, que son las que tienen las app
  dejar el host como noop

Oracle:
  tiene su propio planificador, poner el SO a noop, el se encarga de gestionar los accesos a disco


Por lo general los diferentes algoritmos están cargados por defecto en el kernel. Mirar config de /boot/config*
Si está compilado como módulo deberemos cargarlo (modprobe)


cat /sys/block/sda/queue/scheduler
  schedulers disponibles (entre corchetes el que se está usando)

echo "noop" > /sys/block/sda/queue/scheduler
  para modificar el planificador

elevator=cfq
  esto es para modificarlo en el kernel (y no dejará modificarlo vía tunables)

Al modificar el scheduler se modificaran los tunables específicos de cada scheduler /sys/block/sda/queue/iosched/
En /sys/block/sda/queue/ están los tunables válidos para todos los schedulers

Más info en sys/block/queue.md
