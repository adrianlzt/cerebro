http://man7.org/linux/man-pages/man5/proc.5.html
https://www.kernel.org/doc/Documentation/filesystems/proc.txt


## /proc/self
Link al pid del proceso que está actualmente intentando leer /proc


## /proc/loadavg

http://www.centos.org/docs/5/html/5.2/Deployment_Guide/s2-proc-loadavg.html
This file provides a look at the load average in regard to both the CPU and IO over time, as well as additional data used by uptime and other commands. A sample /proc/loadavg file looks similar to the following:

0.20 0.18 0.12 1/80 11206
The first three columns measure CPU and IO utilization of the last one, five, and 15 minute periods. The fourth column shows the number of currently running processes and the total number of processes. The last column displays the last process ID used.

In addition, load average also refers to the number of processes ready to run (i.e. in the run queue, waiting for a CPU share.



Si un programa que tenia abierto un fichero, se borra ese fichero, aun podemos recuperar el contenido copiando el file descriptor que estaba usando ese proceso.
cp /proc/<PID>/fd/n /tmp/fichero

Si el file descriptor es un socket, el numero entre corchetes es el inodo


## /proc/diskstats

El match entre las entradas de diskstats y las particiones (en caso de tener LVM) se pueden saber con el comando: lsblk
Significado de cada valor:
Field 1 -- # of reads issued
Field 2 -- # of reads merged, field 6 -- # of writes merged
Field 3 -- # of sectors read
Field 4 -- # of milliseconds spent reading
Field 5 -- # of writes completed
Field 7 -- # of sectors written
Field 8 -- # of milliseconds spent writing
Field 9 -- # of I/Os currently in progress
Field 10 -- # of milliseconds spent doing I/Os
Field 11 -- weighted # of milliseconds spent doing I/Os 

## /proc/stat
http://man7.org/linux/man-pages/man5/proc.5.html
Sección /proc/[pid]/stat
Para sacar un campo sin perderse (en el man viene entre parentesis el número de campo que es): 
cat stat | cut -d' ' -f 18  (ejemplo para sacar el priority)

user time y systime mirar time.md



## /proc/$(pidof proceso)/fd
File descriptors de los ficheros
Podemos ver a donde apuntan on ls -la
Si un proceso a abierto un FD, pero hemos borrado el fichero, podemos recuperarlo haciendo cp ../fd/N fichero
Si borramos un fichero creado por un proceso, hasta que el proceso no libere el fd no se libera el espacio ocupado en disco


## /proc/$(pidof proceso)/stat

## /proc/$(pidof proceso)/status
https://www.kernel.org/doc/Documentation/filesystems/proc.txt
Viene explicado cada campo en su propia linea

memoria, usuarios, signales, cpus, context switches...



https://www.kernel.org/doc/Documentation/

/proc/sys/fs
Limites en la apertura de ficheros, inodos, número de usados, etc
https://www.kernel.org/doc/Documentation/sysctl/fs.txt

/proc/sys/fs/inode-state
number_inodes num_free_inodes preshrink 0 0 0 0

preshrink is nonzero when the nr_inodes > inode-max and the
system needs to prune the inode list instead of allocating
more.


The /proc/sys/fs/inode-state file consist of seven numbers:
 
nr_inodes, nr_free_inodes, preshrink and four dummy values i.e. always zero.
 
where: nr_inodes is the number of inodes the system has allocated. This number will grow and shrink dynamically.
              
- nr_free_inodes is the number of free inodes and
 
- preshrink is nonzero when the nr_inodes is greater than the inode-max and the system needs to prune the inode list instead of allocating more.
 
 
•In previous kernels the value inode-max was a parameter that determined the maximum number of open kernel inodes, which are different from file system inodes. As the kernel development progressed, this parameter was eliminated and the kernel now takes care of managing it's internal inode count.
 
•Using df -i will show the amount of statically allocated file system inodes, which are created when the file system is created. These inodes have nothing to do with the internal kernel inodes reported in /proc/sys/fs/inode-nr other than sharing the name inode.
 
•The output from cat /proc/sys/fs/inode-nr has two values. These values refer to internal kernel data structures and are not related to file system inodes. The output is as follows:
 
 
<# of currently allocated kernel inodes> <# of allocated kernel inodes that are not in use>
•The first parameter lists the current number of kernel inodes in use.
•The second parameter refers to the number of previously allocated kernel inodes that have been marked as "free", which makes them available for re-use or for pruning from the kernel inode tree. Again, all of this is handled internally by the kernel with no need for user intervention.


/proc/sys/fs/dentry-state



## /proc/buddyinfo
http://dom.as/2014/01/17/on-swapping-and-kernels/
kmalloc though is used for device drivers when hardware is doing direct memory access (DMA) – so these address ranges have to be contiguous, and therefore to allocate it one has to find subsequent empty pages that can be used. Unfortunately, the easiest way to free up memory is looking at the tail of LRU list and drop some – but that does not give contiguous ranges.

Actual solution for ages was to organize the free memory available into powers-of-2 sized buckets (4k pages, 8k, 16k, ) – called Buddy Allocator (interesting – it was implemented first by Nobel Prize winner in Economics Harry Markowitz back in 1964). Any request for any memory size can be satisfied from larger buckets, and once there’s nothing in larger buckets one would compact the free memory by shuffling bits around.

(Columns on the left are indicating numbers of small memory segments available, columns on the right – larger).
