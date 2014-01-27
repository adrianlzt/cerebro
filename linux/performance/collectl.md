http://collectl.sourceforge.net/

There are a number of times in which you find yourself needing performance data. These can include benchmarking, monitoring a system's general heath or trying to determine what your system was doing at some time in the past. Sometimes you just want to know what the system is doing right now. Depending on what you're doing, you often end up using different tools, each designed to for that specific situation.

Unlike most monitoring tools that either focus on a small set of statistics, format their output in only one way, run either interatively or as a daemon but not both, collectl tries to do it all. You can choose to monitor any of a broad set of subsystems which currently include buddyinfo, cpu, disk, inodes, infiniband, lustre, memory, network, nfs, processes, quadrics, slabs, sockets and tcp.

Ayuda extendida: collectl -x
Opciones generales: collectl --showoptions
  -oT: pone al comienzo de la línea la hora
  -oD: fecha completa  ddmmyyyy hh:mm:ss
Subsistemas --showsubsys
Subopciones para cada subsistema: --showsubopts


Para sacar información le diremos a collectl que "subsystem" es el que la sacará:
collectl -s
  b - buddy info (memory fragmentation)
  c - cpu
  d - disk
  f - nfs
  i - inodes
  j - interrupts by CPU
  l - lustre
  m - memory
  n - network
  s - sockets
  t - tcp
  x - interconnect (currently supported: Infiniband and Quadrics)
  y - slabs

Estos generan información detallada:
  C -  individual CPUs, including interrupts if -sj or -sJ
  D -  individual Disks
  E -  environmental (fan, power, temp) [requires ipmitool]
  F -  nfs data
  J -  interrupts by CPU by interrupt number
  L -  lustre
  M -  memory numa/node
  N -  individual Networks
  T -  tcp details (lots of data!)
  X -  interconnect ports/rails (Infiniband/Quadrics)
  Y -  slabs/slubs
  Z -  processes


# Procesos #
Saca estadísticas de los procesos cada 5 segundos:
collectl -i2:5 -sZ

Saca estadísticas de los procesos que tengan la cadena "apache" en su comando
collectl -i2:5 -sZ --procfilt fapache

--procfilt -> filtro
--procopts -> opciones
  c: include cpu times of children who have exited with their parent
  f: use cumulative totals for maj/min page faults
  i: Show alternate format which includes all io counters
  m: Show alternate format which includes all memory sizes
  p: Never look for new pids or threads after startup (improves performance)
  r: Only show root name of command, leaving off path
  t: Look for thread for all processes
  w: Include command arguments, making a wider display. Can be combined with r.
  z: Only show processes with non-zero sort field. This only applies to --top.


# PID  User     PR  PPID THRD S   VSZ   RSS CP  SysT  UsrT Pct  AccuTime  RKB  WKB MajF MinF Command

SysT: system time
UsrT: user time
Pct: porcentaje de tiempo consumido (puede exceder el 100% en máquinas multiprocesador)
AccuTime: syst+usrt
Estos tiempos pueden exceder el "tiempo de reloj" que medimos en máquinas multiprocesador (en 5 segundos puede haber consumido 10s, 5s en cada procesador)

KiloBytes leídos y escritos
RKB  WKB

Si lo ejecutamos sin información de threads, el proceso padre sumará todo el consumo de sus hijos.

Process analysis:
If you've run collectl as a daemon and collected process data, you now have a huge pile of data and up until version 2.6.5 it wasn't entirely clear what you could do with is short of writing some scripts to try and interpret it. Now you have an alternative and that's to playback one or more data files with the --procanalyze switch. When this switch is passed to collectl, it generates a process summary file with the extension of prcs in the same direcory as specified with the -f switch. This file will contain one line for each unique process and the fields will be separated by collectl's field separator which by default is a space but something you can also change with the --sep switch.
The fields themselves summarize all the key data elements associated with each process making it possible to see the process start/end times, cpu consumption, I/O (if the kernel supports I/O stats), page faults and even the ranges of the different types of memory consumed. And since the data elements are separated by a single character delimeter you can easily load the file into your favorite spreadsheet and perform deeper analysis (the data is actually not very user friendly as written).


### Graphite #### http://collectl.sourceforge.net/Graphite.html
Necesitamos al menos la version 3.6.1
En ubuntu 12.04 no está, la bajo de https://launchpad.net/ubuntu/trusty/i386/collectl/3.6.9-1

Primero probamos que estamos enviando lo que queremos:

collectl --export graphite,192.168.1.113,d=9



### Collect-utils ###
Bajo el .deb de la última versión de https://launchpad.net/ubuntu/+source/collectl-utils/4.7.1-1/+build/4528051
Me pide dependencias:  apt-get install perl-tk libio-socket-ip-perl libgetopt-simple-perl gnuplot

Necesito apache para poder ejecutar el index.cgi (que es un perl)

cp /usr/share/collectl/colplot-apache.conf /etc/apache2/sites-available/
Edito el fichero para cambiar el directorio
  Alias /colplot/ "/usr/share/collectl/"
  <Directory "/usr/share/collectl">

Accedo con: http://10.0.3.103:81/colplot/index.cgi  (tengo apache corriendo en el puerto 81, fichero ports.conf)

Interfaz bastante horrible

