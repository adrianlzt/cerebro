https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=34e431b0ae398fc54ea69ff85ec700722c9da773
Sobre los nuevos campos de free


free nuevo
              total        used        free      shared  buff/cache   available
Mem:          11956        6533        2380         625        3041        4477
Swap:          8191         552        7639

MemAvailable: An estimate of how much memory is available for starting new applications, without swapping. Calculated from MemFree, SReclaimable, the size of the file LRU lists, and the low watermarks in each zone.  The estimate takes into account that the system needs some page cache to function well, and that not all reclaimable slab will be reclaimable, due to items being in use. The impact of those factors will vary from system to system.


free antiguo
             total       used       free     shared    buffers     cached
Mem:          7783       7580        202        231         63       1593
-/+ buffers/cache:       5923       1859
Swap:         3812          5       3807

Libre libre tenemos 202MiB

Mem%used     # memoria usada (incluyendo buffers y cached)
Mem%shared   # shared memory (IPC)
Mem%buffers  # bloques cacheados en memoria
Mem%cached   # paginas mapeadas en memoria, excluyendo buffers
-/+%used     # used - (buffers + cached): memoria no disponible
-/+%free     # free + (buffers + cached): memoria disponible


buffers: cache de bloques (block device I/O)
almac / cached: buffers de ficheros (usado por el file system)
Ambos se almacenan en la estructura de kernel pagecache

Linux uses free memory for the caches, but can reclaim it quickly if applications need it. So in a way the cached memory should be included in the free memory column, which this line does. There’s even a website, linuxatemyram (http://www.linuxatemyram.com/), about this confusion.

# ZFS
It can be additionally confusing if ZFS on Linux is used, as we do for some services, as ZFS has its own file system cache that isn’t reflected properly by the free -m columns. It can appear that the system is low on free memory, when that memory is in fact available for use from the ZFS cache as needed.



# Problemas
Si tenemos resultados inconsistentes mirar:
ballooning.md si estamos sobre vmware
hupepages.md si estamos en un SO con Huge Pages
