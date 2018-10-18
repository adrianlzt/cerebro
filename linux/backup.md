Al hacer backup, hacerlo de /home/usuario
/etc/NetworkManager/system-connections/


Un backup grande llena los buffers y cache de memoria. Luego hacer un drop_caches. Mirar performance/proc/sys-vm-drop_caches.md


Backup de muchos ficheros pequeños. Mirar performance/memoria/tunables.md vm.vfs_cache_pressure



# Enterprise
bareos
bacula
BackupPC




rsnapshot
https://rsnapshot.org/
basado en rsync, escrito en perl. Conecta remotamente con las máquinas para obtener los backups


## Dirvish ##
Mirar dirvish.md

## Rsnapshot ##
Para tener un servidor donde almacenar backups
mirar rsnapshot.md

# Con git
cd dir/
git init .
git add *
git commit -a -m "initial commit"

Cron:
cd dir/
git add *
git commit -a -m "dd/mm/yyyy"

# etckeeper
mirar unixi-tools/etckeeper.md
nos mantiene /etc bajo control de versiones
