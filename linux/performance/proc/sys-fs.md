http://man7.org/linux/man-pages/man5/proc.5.html
https://www.kernel.org/doc/Documentation/filesystems/proc.txt




Si un programa que tenia abierto un fichero, se borra ese fichero, aun podemos recuperar el contenido copiando el file descriptor que estaba usando ese proceso.
cp /proc/<PID>/fd/n /tmp/fichero

Si el file descriptor es un socket, el numero entre corchetes es el inodo



## /proc/buddyinfo
http://dom.as/2014/01/17/on-swapping-and-kernels/
kmalloc though is used for device drivers when hardware is doing direct memory access (DMA) – so these address ranges have to be contiguous, and therefore to allocate it one has to find subsequent empty pages that can be used. Unfortunately, the easiest way to free up memory is looking at the tail of LRU list and drop some – but that does not give contiguous ranges.

Actual solution for ages was to organize the free memory available into powers-of-2 sized buckets (4k pages, 8k, 16k, ) – called Buddy Allocator (interesting – it was implemented first by Nobel Prize winner in Economics Harry Markowitz back in 1964). Any request for any memory size can be satisfied from larger buckets, and once there’s nothing in larger buckets one would compact the free memory by shuffling bits around.

(Columns on the left are indicating numbers of small memory segments available, columns on the right – larger).


## /proc/sys/fs/file-max
The maximum number of concurrently open files. We recommend a limit of at least 32,832.

## /proc/sys/fs/file-nr
the total allocated file handles.
the number of currently used file handles (with the 2.4 kernel); or the number of currently unused file handles (with the 2.6 kernel). Parece que en kernels nuevo esta a 0
the maximum file handles that can be allocated (also found in /proc/sys/fs/file-max).
