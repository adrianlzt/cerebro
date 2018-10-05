Business logic
Applications
Services
Infrastructure


Capacity
Availability
Performance
Scalability


Basicos:
  Errores en Call Trace
    I/O error
    task abort on host
    Call Trace
    oom-killer
  cpu
  disco (espacio libre e inodos)
  dns (resuelve?)
  fs_writable (los discos estan en rw? probar a hacer un touch en cada fs)
  load
  memory
  netinterfaces (estan up?)
  network (errores en las interfaces?)
  open_files (ficheros abiertos VS máximo numero de ficheros abiertos del SO /proc/sys/fs/file-nr)
  procs_fd_limit (numero de FDs usados comparado con el limite por cada proceso)
  procesos zombies
  slab_memory (% del uso respecto a la memoria total, /proc/meminfo)
  swap
  swap rate
  uptime (avisar en caso de reinicio de la maquina)
  exhaustacion de puertos (puertos usados VS cat /proc/sys/net/ipv4/ip_local_port_range | awk '{printf "%d", $2-$1;}')

  memoria dedicada a las page tables? Mucho mmap? Mirar http://www.scylladb.com/2017/10/05/io-access-methods-scylla/  Copying and MMU activity

  Máquina física:
    - fallos de memoria:
      EDAC (Error Detection and Correction kernel module)
      edac-utils, herramienta que nos avisa de los errores que se producen
      en el dmesg podemos encontrar mensajes tipo:
        [1080637.049021] EDAC MC0: 1 CE none on DIMM3 (channel:1 slot:2 page:0x0 offset:0x0 grain:32 syndrome:0xa0513410 - bank 2, cas 336, ras 3394

      De la man page de memtester:
      Note  that  problems  in other  hardware  areas  (overheating  CPU,  out-of-specification power supply, etc.) can cause intermittent memory faults
      memtester MEMORIA[M|G] LOOPS
        si solicitamos más memoria de la disponible memtester va a reducir la cantidad hasta poder hacer un mlock
        si solicitamos demasiada memoria el sistema puede empezar a swapear y podría saltar tambien el OOM killer

      Tambien podemos instalar memtest86+, configurar una entrada en grub (memtest-setup), y arrancar ahí para probar la memoria


    - fallos en la fuente de alimentación?
      parece que si la fuente no funciona bien puede retornar fallos de "ata" en el dmesg. SMART no dirá nada
      http://eliasoenal.com/2012/10/31/power-supply-failures-can-be-pretty-annoying-to-find/
      Mensajes tipo:
        ata1.00: BMDMA stat 0x24
        ata1.00: failed command: READ DMA
        ata1.00: status: { DRDY ERR }
        ata1.00: error: { UNC }

    - sensores (temperatura, voltage, revoluciones) fuera de rango
      usar lm_sensors (mirar lm_sensors.md)



https://vividcortex.com/blog/2013/10/14/what-should-i-monitor/

http://word.bitly.com/post/74839060954/ten-things-to-monitor
  Fork rate (creación de procesos por segundo)
    Según bitly, máquinas en producción con tráfico estable no deberían superar la 10 newprocs/s
    En la vida real nos encontramos con muchas máquinas que superan ese valor.
    Para hacer un análsis a mano podemos ejecutar:
      grep process /proc/stat | cut -d ' ' -f 2; sleep 1m; grep process /proc/stat | cut -d ' ' -f 2
    Luego restamos y dividimos entre 60 para obtener el ratio por segundo.
  Swap-in/out rate
    es más importante ver el número de páginas que se están swapeando por minuto que el tamaño total de swap; un gran swap estático puede no empeorar el performance
  Server boot notification (avisar si el servidor se ha reiniciado).
    Hacer checkeando el uptime de la máquina, si es menor de 1h avisar (dejar margen para que se ejecute el check)
    El check debería quedarse en estado CRITICAL hasta que lo quitemos nosotros. No tiene que tener reintentos.
  ntp: ntpd running. clock skew inside datacenter. clock skew against external source
  DNS resolution: funciona correctamente la resolución de DNS interna. Queries/s ?
  SSL expiration: chequear los certificados ssl y avisar cuando vayan a caducar
  File descriptors
  Chequear lo mismo que chequea el load balancer para saber si un nodo está activo
  Apache/Nginx error logs
  Service restarts
  NUMA stats

http://www.somethingsimilar.com/2013/01/14/notes-on-distributed-systems-for-young-bloods/
Use percentiles, not averages. Percentiles (50th, 99th, 99.9th, 99.99th) are more accurate and informative than averages in the vast majority of distributed systems. Using a mean assumes that the metric under evaluation follows a bell curve but, in practice, this describes very few metrics an engineer cares about. “Average latency” is a commonly reported metric, but I’ve never once seen a distributed system whose latency followed a bell curve. If the metric doesn’t follow a bell curve, the average is meaningless and leads to incorrect decisions and understanding. Avoid the trap by talking in percentiles. Default to percentiles, and you’ll better understand how users really see your system.


https://image.slidesharecdn.com/dockercon2017performanceanalysis-170419182647/95/container-performance-analysis-24-638.jpg?cb=1492660928
USE: Util, Saturation, Errors
CPU, Mem, Storage I/O, Network
