http://man7.org/linux/man-pages/man5/proc.5.html
https://www.kernel.org/doc/Documentation/filesystems/proc.txt


## /proc/buddyinfo

Muestran la fragmentación de memoria producida por el Buddy Algorythm (nº de bloques libres de tamaño PAGESIZE^0, PAGESIZE^1, PAGESIZE^2...)

Va fusionando páginas para hacer huecos más grandes.
En cada columna nos dice los huecos de páginas de 4k, 8k, 16k, etc que hay.
Cada fila es cada una de las zonas NUMA, también separa entre zona DMA y normal

http://dom.as/2014/01/17/on-swapping-and-kernels/
kmalloc though is used for device drivers when hardware is doing direct memory access (DMA) – so these address ranges have to be contiguous, and therefore to allocate it one has to find subsequent empty pages that can be used. Unfortunately, the easiest way to free up memory is looking at the tail of LRU list and drop some – but that does not give contiguous ranges.

Actual solution for ages was to organize the free memory available into powers-of-2 sized buckets (4k pages, 8k, 16k, ) – called Buddy Allocator (interesting – it was implemented first by Nobel Prize winner in Economics Harry Markowitz back in 1964). Any request for any memory size can be satisfied from larger buckets, and once there’s nothing in larger buckets one would compact the free memory by shuffling bits around.

(Columns on the left are indicating numbers of small memory segments available, columns on the right – larger).
