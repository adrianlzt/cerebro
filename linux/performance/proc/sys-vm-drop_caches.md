Para vaciar las caches.
Depende que número le enviemos borrará unas caches, otras o todo.


free && sync && echo 3 > /proc/sys/vm/drop_caches && free


Writing to this will cause the kernel to drop clean caches, dentries and inodes from memory, causing that memory to become free.

To free pagecache (liberar parte de buffers y cache que dice 'free'):
        echo 1 > /proc/sys/vm/drop_caches

To free dentries and inodes (parte de la memoria slab):
        echo 2 > /proc/sys/vm/drop_caches

To free pagecache, dentries and inodes:
        echo 3 > /proc/sys/vm/drop_caches

To increase the number of objects freed by this operation, the user may run `sync' prior to writing to /proc/sys/vm/drop_caches.  This will minimize the number of dirty objects on the system and create more candidates to be dropped.

* No debe realizarse en producción salvo memoria muy baja (produce paradas I/O muy largas) o en casos donde quiera invalidarse la cache (p.e. tras un proceso batch)

Caso de uso: un proceso batch (por ejemplo backup), llena la cache con un montón de datos que no vamos a usar, así que en este caso si que merece la pena hacer un drop de la cache.
