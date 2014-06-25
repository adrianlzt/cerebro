Al hacer backup, hacerlo de /home/usuario
/etc/NetworkManager/system-connections/


Un backup grande llena los buffers y cache de memoria. Luego hacer un drop_caches. Mirar performance/proc/sys-vm-drop_caches.md


Backup de muchos ficheros pequeños. Mirar performance/memoria/tunables.md vm.vfs_cache_pressure



## Dirvish ##
Mirar dirvish.md
