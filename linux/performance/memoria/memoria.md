#http://www.linuxatemyram.com/play.html

$ LANG=en_US free -m
             total       used       free     shared    buffers     cached
Mem:          7784       7282        501          0        184       4247
-/+ buffers/cache:       2850       4933
Swap:         3812          0       3812


La primera linea cuenta la memoria que esta totalmente libre (no ocupada por aplicaciones, ni cache, ni buffers).
La segunda linea nos dice la memoria que está libre para las aplicaciones (restando buffers y cache)


Borrar disk cache: mirar proc/sys-vm-drop_caches.md



http://www.linuxjournal.com/article/8178

## Entendiendo swap, paging, etc ##

Paging refers to writing portions, termed pages, of a process' memory to disk. Swapping, strictly speaking, refers to writing the entire process, not just part, to disk. In Linux, true swapping is exceedingly rare, but the terms paging and swapping often are used interchangeably.

When pages are written to disk, the event is called a page-out, and when pages are returned to physical memory, the event is called a page-in. A page fault occurs when the kernel needs a page, finds it doesn't exist in physical memory because it has been paged-out, and re-reads it in from disk.

'Trashing", el kernel está más tiempo manejando "page-outs" que trabajando.
Usar swap no es malo en si mismo, lo malo es este intensa actividad de paging.


## Entendiendo vmstat ##

To monitor the virtual memory activity on your system, it's best to use vmstat with a delay. A delay is the number of seconds between updates. If you don't supply a delay, vmstat reports the averages since the last boot and quit. Five seconds is the recommended delay interval.
# vmstat 5
procs -----------memory---------- ---swap--   -----io---- -system--   -----cpu----
 r  b   swpd  libre   buff caché      si   so    bi    bo   in   cs   us sy id wa
 1  0     16 1007436 189736 2979456    0    0    25   105  100   209   9  4 78  9
 2  1     16 1004276 189740 2981188    0    0     0   610 17211 4067  10  7 66 17
 1  0     16 1052176 189740 2973604    0    0     0   623 17232 4575  10  8 64 19
 0  1     16 1050028 189752 2974472    0    0     0   650 19000 5027  11  7 63 19

r: esperando para 'run time'
b: uninterruptible sleep (esperando por un IO de disco o de red)

swpd: memoria usada para hacer paging
libre: memoria sin usar
buff: memoria usada para buffers
cache: memoria usada como cache

si: page-in
so: page-out

bi: bloques recibidos desde dispositivos de bloques (bloq/s)
bo: bloques enviados a dispositivos de bloques (bloq/s)

in: número de interrupciones por segundo, contando el reloj
cs: número de cambios de contexto por segundo

CPU, porcentajes sobre el tiempo total de CPU:
us: user time, including nice time (non-kernel code)
sy: system time (kernel code)
id: idle
wa: waiting for IO
st: stolen from VM

Mostrar la memoria activa/inactiva:
# vmstat -a

Tabla con el uso de la memoria para las distintas partes
# vmstat -sS M

Mirar escrituras y lecturas a los discos
# vmstat -d
# vmstat -p /dev/sda1  (se puede restringir a una sola partición)

Resumen sobre la escritura a disco
# vmstat -D


Para ponerlo en 'human-readable': # vmstat 5 -S M (salida en megabytes)

## Top ##

Tambien es útil mirar a la cabecera de top para hacernos una idea sobre como está la memoria:
top - 16:49:12 up  7:22,  8 users,  load average: 2,29, 2,55, 2,52
Tareas: 234 total,   2 running, 231 sleeping,   0 stopped,   1 zombie
%Cpu(s):  8,8 us,  5,8 sy,  0,0 ni, 65,3 id, 19,9 wa,  0,0 hi,  0,2 si,  0,0 st
KiB Mem:   7970960 total,  6797356 used,  1173604 free,   188656 buffers
KiB Swap:  3904508 total,       16 used,  3904492 free,  2936680 cached


Usos de la memoria ram: procs, compart, buffers, almacenamiento ?

slabtop -> ?
vmstat -m

Ideas de Alejandro:

  -Los procesos piden una cantidad de memoria, pero luego no usan toda.
  Esto lo podemos ver con el top ('f' para agregar/quitar columnas). Es la diferencia entre:
    VIRT  --  Virtual Memory Size (KiB)
      The total amount of virtual memory used by the task.  It includes all code, data and shared libraries plus pages that have been swapped out and pages that
      have been mapped but not used.
    RES  --  Resident Memory Size (KiB)
      The non-swapped physical memory a task has used.

    Otra columna interesante:
    SWAP  --  Swapped Size (KiB)
      The non-resident portion of a task's address space.


 
After some extensive reading on the 2.6 kernel swapping and page-caching features I found 'fcoretools'. Which consists of two tools;
fincore: Will reveal how many pages the application has stored in core memory
fadvise: Allows you to manipulate the core memory (page-cache).



vmtouch seems like a good tool for the job.
Highlights:
 query how much of a directory is cached
 query how much of a file is cached (also which pages, graphical representation)
 load file into cache
 remove file from cache
 lock files in cache
 run as daemon



 Swappiness is a property for the Linux kernel that changes the balance between swapping out runtime memory, as opposed to dropping pages from the system page cache. Swappiness can be set to values between 0 and 100 inclusive. A low value means the kernel will try to avoid swapping as much as possible where a higher value instead will make the kernel aggressively try to use swap space. The default value is 60, and for most desktop systems, setting it to 100 may affect the overall performance, whereas setting it lower (even 0) may improve interactivity (decreasing response latency.)



vfs_cache_pressure (https://www.kernel.org/doc/Documentation/sysctl/vm.txt)
 Controls the tendency of the kernel to reclaim the memory which is used for caching of directory and inode objects.
 At the default value of vfs_cache_pressure=100 the kernel will attempt to reclaim dentries and inodes at a "fair" rate with respect to pagecache and swapcache reclaim. Decreasing vfs_cache_pressure causes the kernel to prefer to retain dentry and inode caches. ...



Minima memoria completamente libre en el sistema (sysctl vm.min_free_kbytes). En mi arch, 67MB
https://www.linbit.com/en/kernel-min_free_kbytes/
https://askubuntu.com/questions/41778/computer-freezing-on-almost-full-ram-possibly-disk-cache-problem
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Performance_Tuning_Guide/s-memory-tunables.html

The minimum number of kilobytes to keep free across the system. This value is used to compute a watermark value for each low memory zone, which are then assigned a number of reserved free pages proportional to their size.

Be cautious when setting this parameter, as both too-low and too-high values can be damaging and break your system.
Setting min_free_kbytes too low prevents the system from reclaiming memory. This can result in system hangs and OOM-killing multiple processes.
However, setting this parameter to a value that is too high (5-10% of total system memory) will cause your system to become out-of-memory immediately. Linux is designed to use all available RAM to cache file system data. Setting a high min_free_kbytes value results in the system spending too much time reclaiming memory.
