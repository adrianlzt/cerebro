https://www.kernel.org/doc/Documentation/cgroup-v2.txt (mergeado en kernel 4.5)
http://mirror.onet.pl/pub/mirrors/video.fosdem.org/2017/UA2.220/cgroupv2.vp8.webm
https://www.kernel.org/doc/Documentation/cgroup-v1/
https://www.certdepot.net/rhel7-get-started-cgroups/
http://en.wikipedia.org/wiki/Cgroups
http://www.redhat.com/summit/2011/presentations/summit/in_the_weeds/friday/WangKozdemba_f_1130_cgroups14.pdf
yum install kernel-doc; cd /usr/share/doc/kernel-doc-3.14.2/Documentation/cgroups/
https://wiki.archlinux.org/index.php/cgroups
https://www.redhat.com/en/about/blog/world-domination-cgroups-part-1-cgroup-basics presents some basics and theory behind CGroups,
https://www.redhat.com/en/about/blog/world-domination-cgroups-part-2-turning-knobs investigates the current state of active CGroups,
https://www.redhat.com/en/about/blog/world-domination-cgroups-part-3-thanks-memories looks at the Memory controller.


Para usarlo en sistemas con systemd mirar cgroups-systemd.md

Otras formas de limitar:
 ulimit
 setrlimits
 limits.conf
 nice



cgroup is a mechanism to organize processes hierarchically and distribute system resources along the hierarchy in a controlled and configurable manner.

cGroups (control groups) is a Linux kernel feature to limit, account and isolate resource usage (CPU, memory, disk I/O, etc.) of process groups

Estructura jerárquica donde cada proceso pertenece a un único cgroup.
Los hijos por defecto irán al mismo cgroup que el padre, aunque podrán ser cambiados.

Muchos de los problemas vienen por la exhaustación de recursos.
Con cGroups limitamos, por recurso, que límites tiene de CPU, memoria, disco, etc

Tipos de controladores / Subsistemas:
  - CPU
  - Memoria
  - Disk IO
  - Red

cgroups v2 tiene un único punto de montaje (v1 tenia varios). v2 y v1 pueden convivir juntos al mismo tiempo. Los controllers que soporten v2 y no estén siendo utilizados en v1 se unirán automáticamente a v2
Podemos ver si lo tenemos montado con (cgroup2 será la versión 2)
mount | grep cgroup


# v2 uso manual
cd /sys/fs/cgroup/unified
  o donde tengamos montado el cgroupsv2
mkdir prueba
  creamos un cgroup (podemos seguir creando dirs para hacer una jerarquia)
rmdir prueba
  si ya no está en unso (o solo con procesos zombies) podemos borrar un cgroup

cat /proc/PID/cgroup
  nos dice a que cgroups pertenece un proceso (una linea por cada controller)
  para v2 sera la línea "0::xxx"

cat cgroup/cgroup.events
  "populated N", 1 si este cgroup o algún hijo tiene procesos

cat cgroup/cgroup.controllers
  controllers disponibles

echo "+cpu +memory -io" > cgroup.subtree_control
  activamos/desactivamos controllers
  consultamos cuales están activos


## Pesos / Límites / Proteciones / Allocations
Pesos: distribuir pesos entre los hijos (entre 1 y 10000, por defecto 100).
Límites: limite por hijo. La suma de hijos puede ser mayor que el límite de padre
Protections: para asegurar una memoría mínima para un cgroup
Allocations: límites que no se pueden sobrepasar

## Controllers

### Memoria
Gestión complicada.
Se tienen en cuenta:
 - Userland memory - page cache and anonymous memory.
 - Kernel data structures such as dentries and inodes.
 - TCP socket buffers.
Valores en bytes (redondeados automáticamente a PAGE_SIZE).

memory.current: consumo total de memoria por el cgroup y sus descendientes
memory.high: mecanismo principal para limitar la memoria. Por encima de este valor los procesos del cgroup son throttled y puestos bajo una presión de reclamación de memoria muy grande. Este límite nunca llama al OOM. Podría superarse el límite en condiciones extremas.
memory.max: si el cgroup alcanza este límite y no puede recudirse el consumo de memoria, se ejecutará el OOM killer en el cgroup. Bajo ciertas condiciones se podría rebasar el límite temporalmente.
memory.events: recuento de eventos de low, high, max y oom que han saltado.
memory.stat: descripción detallada del consumo de memoria
memory.swap: consumo de ram (se puede limitar memory.swap.max)

Limitando memory.high y observando memory.events podemos llegar a un valor mínimo de la app para que funcione bien.


### IO
### CPU
### PID
  pids.max: número máximo de pids
### RDMA
### perf_event enables monitoring CGroups with the perf tool

## Namespace
La información puesta en /proc/PID/cgroup debe estar en un namespace para que un proceso dentro de uno no pueda ver el path completo donde está configurado (información sensible)







# V1

blkio: sets limits on input/output access to and from block devices (see BlockIOWeight);
cpu: uses the CPU scheduler to provide CGroup tasks an access to the CPU. It is mounted together with the cpuacct controller on the same mount (see CPUShares);
cpuacct: creates automatic reports on CPU resources used by tasks in a CGroup. It is mounted together with the cpu controller on the same mount (see CPUShares);
cpuset: assigns individual CPUs (on a multicore system) and memory nodes to tasks in a CGroup;
devices: allows or denies access to devices for tasks in a CGroup;
freezer: suspends or resumes tasks in a CGroup;
memory: sets limits on memory use by tasks in a CGroup, and generates automatic reports on memory resources used by those tasks (see MemoryLimit);
net_cls: tags network packets with a class identifier (classid) that allows the Linux traffic controller (the tc command) to identify packets originating from a particular CGroup task;
perf_event: enables monitoring CGroups with the perf tool;
hugetlb: allows to use virtual memory pages of large sizes, and to enforce resource limits on these pages.


Listar todos y decir donde están montados (si tenemos systemd ya estarán montados)

# lssubsys -am
cpuset /sys/fs/cgroup/cpuset
cpu,cpuacct /sys/fs/cgroup/cpu,cpuacct
memory /sys/fs/cgroup/memory
devices /sys/fs/cgroup/devices
freezer /sys/fs/cgroup/freezer
net_cls /sys/fs/cgroup/net_cls
blkio /sys/fs/cgroup/blkio
perf_event /sys/fs/cgroup/perf_event
hugetlb /sys/fs/cgroup/hugetlb

También podemos verlo con:
cgsnapshot

CPU:
  Ejemplo: creo dos grupos, uno con 2cores y el otro con los 6 restantes.
           Luego asocio un comando a uno de los grupo y digo que porcentaje puede consumir
  cpu.shares: tiempo relativo (cuanta cpu recibe un cgroup comparado con otro cgroup. Los procs no cgrupeados no entran en cuenta aqui)
  cpu.rt_runtime_us: máximo número de microsegundos en CPU (para procesos Real Time). Cuidado!
  cpuset: afinidad
    .cpus: cpus permitidas (0-2,5,7)
    .mems nodos de memoria permitidos (0-2,5,7)

Memoria:
  Se pueden controlar consumos y afinidad NUMA (usar solo ciertos nodos de memoria afines a un procesador)
  memory: memoria
    .force_empty: 0 limpia buffers y cache
    .swappiness: 0 reduce mucho el swapping, 100 libera memoria

Disk IO:
  Balanceo por pesos
  blkio
  devices: acceso a devices
    .allow: controla acceso a devices (TIPO MAJOR, MINOR ACCESS)
  freezer: agrupa tareas para congelarlas
    .state: congela tareas en el cgroup (FROZEN/THAWED)

Red:
  Control de ancho de banda
  net_cls: marca paquetes (para tc, shaping, iptables)

ns: Name Space
  Para aislamiento de procesos (containers)


Jerarquías y cGroups:
  Con esto podemos hacer un arbol de jerarquías, por ejemplo creando el cgroup "IT" y debajo de este cgroup meter cuatro departamentos.

Instalación:
yum -y install libcgroup


Debemos tener un demonio arrancando que será el encargado de hacer cumplir las restricciones.
chkconfig cgconfig on
service cgconfig start


Ejemplos de configuraciones /etc/cgconfig.conf (reiniciar cgconfig tras modificar el fichero):

# Asigno los subsistemas cpu y cpuacct al cgroup "jcpu"
mount {
  cpu = /cgroup/jcpu;
  cpuacct = /cgroup/jcpu;
}

# Configuración de un grupo o subgrupo
group GRUPO1/SUBGRUPO1 {
  perm {
    # owner del fichero tasks (puede añadir tareas)
    task {
      uid = USUARIO1;
      gid = GRUPO1;
    }
    # owner del resto (editar params y crear subgrupos)
    admin {
      uid = USUARIO2;
      gid = GRUPO2;
    }
  }

  # Características de los controladores
  cpu {
    cpu.shares = "1000";
  }
}


Toda esta configuración tiene una representación a nivel de ficheros.
      mkdir -p /cgroup/jcpu
      mount -t cgroup -o cpu,cpuacct jcpu /cgroup/jcpu
      mkdir -p /cgroup/jcpu/GRUPO1/SUBGRUPO1 # me crea ficheros para los subsistemas que haya definido
En sistemas con systemd ya lo tenemos montado en
/sys/fs/cgroup/
blkio  cpu  cpuacct  cpu,cpuacct  cpuset  devices  freezer  memory  net_cls  systemd

chown USUARIO2:GRUPO2 /cgroup/jcpu/GRUPO1/SUBGRUPO1/* # defino el admin
chown USUARIO1:GRUPO1 /cgroup/jcpu/GRUPO1/SUBGRUPO1/tasks # defino el usuario que puede añadir tasks
echo "1000" > /cgroup/jcpu/GRUPO1/SUBGRUPO1/cpu.shares
echo PID > /cgroup/jcpu/GRUPO1/SUBGRUPO1/tasks # no hace falta hacer append (>>), es una orden y el ya sabe como tratarlo
  para sacar una task de un group, podemos hacer el echo PID al grupo general

Esta configuración se aplicaría en el mismo momento, pero no sería persistente.
Si quisieramos hacerlo persistente:
cgsnapshot > /etc/cgconfig.conf


También podemos usar comandos:
cgcreate -g cpuset:GRUPO # crear grupo
cgcreate -a uid:gid -t uid:gid -g cpu,cpuset,freezer:/group1
  -a <tuid>:<tgid>              Owner of the group and all its files
  -t <tuid>:<tgid>              Owner of the tasks file
  -g <controllers>:<path>       Control group which should be added
cgset -r cpuset.cpus=02 GRUPO # definir grupo
cgget -a GRUPO # mostrar cgroup
cgsnapshot cpuset # genera cgconfig.conf solo para cpuset
cgclassify -g cpu,cpuset:GRUPO PID1 PID2 PID3 # mueve proceso a cgroup
cgdelete cpuset:GRUPO # borrar cgroup



Arrancar un proceso en un cgroup:
echo $$ > /sys/fs/cgroup/cpuset/pruebaadri/tasks
CMD
  esto mete el PID de la shell actual en el cgroup
  todo lo que arranquemos en la shell ahora correrá en este cgroup

Mejor, no deja arrancada una shell en el cgroup
sh -c "echo \$$" > /sys/fs/cgroup/cpuset/pruebaadri/tasks && CMD

Si queremos sacar un PID de un cgroup, lo metemos en el grupo padre
echo $(cat /sys/fs/cgroup/cpuset/pruebaadri/tasks) > /sys/fs/cgroup/cpuset/tasks)

Si metemos un proceso corriendo en un cgroup, no va a cambiar en caliente el uso limitado de cpus, por ejemplo.

Con cgexec (sticky los hijos también pertenecerán al mismo grupo)
cgexec -g cpu:grupo1 CMD --sticky



## cgred
Asignar a grupos por reglas
Cuando se arranca un proceso mira el fichero /etc/cgrules.conf y si aplica una regla lo mete en el cgroup correspondiente.

Sintaxis:
usuario		controlador	/cgroup1/
usuario:cmd	controlador	/cgroup2/
@grupo		*		/cgroup3/
%		cpu,memory	/grupo2/subgrupo3 # '%' es que copia el valor de arriba


Arrancar un servicio en un cgroup, independientemente de que cgred este corriendo o no (este usa cgexec):
  Definir CGROUP_DAEMON=cpu:grupo1" en su fichero /etc/sysconfig/
  Arrancarlo con la funciona daemon() de /etc/init.d/functions


cGroups, número y activados
cat /proc/cgroups

ps con info de cgroups
ps -e opid,comm,cgroup

cat /proc/PID/cpuset
  nos dice a que cpuset pertenece. Será '/' si es el general

Listar cgroups
lscgroup



Ejemplo, mueve el proceso con pid PID al procesador 0
cgcreate -g cpuset:solocpu0
cgset -r cpuset.cpus=0 solocpu0
cgclassify -g cpuset:solocpu0 PID
  Una vez se muera el proceso, se borrará la regla, no hay problemas de que cuando se reuse el PID habrá problemas



## Disco ##
traspas dia3-io/io step-66
Limitar acceso a disco:
cgcreate -g devices:NOMBRE
cgset -r devices.allow "b 8:0 r"
  b: block
  8: minor number (ls -la /dev/sda | cut -d ' ' -f 5 | tr -d ',')
  0: major number (ls -la /dev/sda | cut -d ' ' -f 6)
  r: lectura

Dar más prioridad a un grupo u otro
  blkio
  Deberemos crear dos grupos, y dar un peso a cada uno.

Para tasas absolutas
  velocidad: cgset -r blkio.throttle.read_bps_device ...
  iops: ...


## Memoria ##
- Kernel arrancado con opcion "cgroup_enable=memory"

cgset
  memory.stat
  memory.limit_in_bytes         # limite memoria del cgroup (especificar 1º)
  memory.memsw.limit_in_bytes   # limite incluyendo swap (despues)
  memory.swappiness             # swappiness por cgroup
  cpuset.mems                   # afinidad NUMA


## CPU ##
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Resource_Management_Guide/sec-cpuset.html

cgset
  cpu.rt_period_us              # periodo para RT (tamaño del turno de los procesos RT, para no monopolizar la CPU)
  cpu.rt_runtime_us             # periodo maximo running para RT (valor límite para cuando un proc RT no tiene con quien competir)
  cpu.cfs_period_us             # periodo (clases normales, el periodo máximo del proceso que puede estar ejecutándose)
  cpu.cfs_quota_us              # periodo running (-1 si no se limita)
  cpu.shares                    # share relativo de CPU (para balanceo entre cpus)
  cpuset.cpus                   # CPUs permitidas
  cpuset.mems                   # nodos de memoria permitidos
  cpuset.memory_migrate         # permite migrar memoria si cambia cpuset.mems
  cpuset.cpu_exclusive          # si la cpu se comparte o no con otros cgroups
                                # 0 se comparte, 1 uso exclusivo del cgroup
  cpuset.mem_exclusive          # si la memoria se comparte o no con otros
  cpuset.memory_spread_page     # distribucion de system buffers
  cpuset.memory_spread_slab     # distribucion de slabs
  cpuset.sched_load_balance     # activa/desactiva balanceo de carga
  cpuset.sched_relax_domain_level  # configuracion del balanceo (1-5)


## Errores ## 
Error changing group of pid 8370: No space left on device
  No se puede asignar solo cpuset.cpus, también hace falta definie cpuset.mems
  Parece que es un bug de Fedora/RedHat


# echo 1 > cpuset.cpu_exclusive 
bash: echo: error de escritura: Argumento inválido
bash: echo: write error: Invalid argument
Porque hay ya una tarea en tasks





# PRUEBAS
Para ver como gestionan los cgroups la memoria (malloc vs usada, OOM killer, etc) podemos usar este programa
https://stackoverflow.com/questions/28843537/using-cgroups-to-control-memory-usage-on-linux

Otro ejemplo de uso aqui: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Resource_Management_Guide/sec-memory.html
