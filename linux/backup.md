Al hacer backup, hacerlo de /home/usuario
/etc/NetworkManager/system-connections/


Un backup grande llena los buffers y cache de memoria. Luego hacer un drop_caches. Mirar performance/proc/sys-vm-drop_caches.md


Backup de muchos ficheros pequeños. Mirar performance/memoria/tunables.md vm.vfs_cache_pressure



# Enterprise
bareos
bacula
BackupPC


# restic
https://restic.readthedocs.io/en/latest/index.html
Simple, con varios backends. Escrito en go.

## Server (podemos usar otras cosas como backend)
docker run --rm -it --name restic-server -p 8000:8000 -v "$PWD/data:/data" restic/rest-server rest-server --path /data

## Cliente
Backend rest-server
Creamos el repo:
restic init -r rest:http://localhost:8000/

Usar variables de entorno para pasarle el repo por defecto RESTIC_REPOSITORY
Y la password ejecutando un comando: RESTIC_PASSWORD_COMMAND

### backups
Hacer un backup de un directorio
restic backup directorio/
  usará deduplicación para no enviar datos de más

Si volvemos a ejecutar el backup contra el mismo dir, verá que es lo mismo y solo enviará los cambios

Podemos hacer backup de un único fichero de un directorio ya backupeado:
restic backup directorio/a

Tenemos varias opciones para excluir/incluir ficheros: --exclude --iexclude --exclude-caches --exclude-file --exclude-if-present --files-from
--one-file-system no cruzar file systems

Podemos usar tags:
restic backup --tag A --tab B directorio/

Backup de contenido de stdin
mysqldump [...] | restic -r /srv/restic-repo backup --stdin --stdin-filename production.sql


### ver contenido
Ver los backups (snapshots). Nos dice el id, fecha, host que lo hizo, tags y el path del que se hizo backup
restic snapshots

Podemos aplicar filtros y "group by"
--host xx
--path xx
--group-by host

Ver el contenido del backup
restic ls ID

Buscar ficheros en todos los snapshots
restic find nombre
restic find "*.sql"

Mount/fuse
restic mount mnt/
Tendremos la información puesta organizada de varias formas. Por IDs, por hosts, por tags, por snapshots


### check
Recomendado chequear de vez en cuando los backups. Se puede hacer un check leyendo tambien los datos, mirar --read-data y --read-data-subset
restic check



### Restaurar
restic restore ID --target /donde/restaurarlo

Podemos poner "latest" como ID
Seleccionar con --path --host --include



# rsnapshot
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
