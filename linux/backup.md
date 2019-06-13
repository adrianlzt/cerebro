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

Podemos crear distintos repos con distintos paths
restic init -r rest:http://localhost:8000/dos

Usar variables de entorno para pasarle el repo por defecto RESTIC_REPOSITORY
Y la password ejecutando un comando: RESTIC_PASSWORD_COMMAND

### backups
Hacer un backup de un directorio
restic backup dir1/ dir2/ dir3/file1
  usará deduplicación para no enviar datos de más

Si volvemos a ejecutar el backup contra el mismo dir, verá que es lo mismo y solo enviará los cambios
En cada id tendremos todos los ficheros del directorio.

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

Dump de un fichero
restic dump 098db9d5 production.sql | mysql

Truco para seleccionar un fichero por su path y usar latest en vez del snapshot ID
restic dump --path /production.sql latest production.sql | mysql


Dump de un dir, formato tar
restic dump /home/other/work latest > restore.tar


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


### Borrar snapshots
https://restic.readthedocs.io/en/latest/060_forget.html
Costoso
restic forget --prune a8228ef0
  forget solo "olvida". Prune borra

Si hicimos un backup de un dir y borramos un id viejo, los ficheros seguiran estando en los ids nuevos

restic forget --keep-last 1 --prune
  dejar solo el último backup de cada directorio

Tenemos varios parámetros para poder políticas de borrado
https://restic.readthedocs.io/en/latest/060_forget.html#removing-snapshots-according-to-a-policy

Another example: Suppose you make daily backups for 100 years. Then forget --keep-daily 7 --keep-weekly 5 --keep-monthly 12 --keep-yearly 75 will keep the most recent 7 daily snapshots, then 4 (remember, 7 dailies already include a week!) last-day-of-the-weeks and 11 or 12 last-day-of-the-months (11 or 12 depends if the 5 weeklies cross a month). And finally 75 last-day-of-the-year snapshots. All other snapshots are removed.


### Keys
Podemos gestionar varias keys para acceder al repo
restic key list/add/remove/passwd

restic key add
  crearemos una nueva key con la pass que pongamos. Parece que el User y Host lo pone de forma automática https://github.com/restic/restic/blob/master//internal/repository/key.go#L223

si borramos la key, se dejará de tener acceso.



### scripting
podemos pasar --json para sacar el output en formato json





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
