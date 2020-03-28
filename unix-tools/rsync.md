CUIDADO, el directorio origen, NO poner "directorio/", porque entonces copiará lo que hay dentro, pero no el directorio.
Peor poner dir/*, porque copiará lo que hay dentro de cada dir
Si queremos mover hostA:/mnt/foo a hostB:/mnt/foo hacer: rsync -r /mnt/foo hostB:/mnt

Mejora sobre rcp y scp. Hace transmisiones incrementales, evitando enviar los datos de los que ya dispone la otra parte.

rsync --info=progress2 -a Origen Destion

# rsync -ahH --stats --numeric-ids directorio pepe@10.5.2.1:/rsinc/
-a, --archive               archive mode; equals -rlptgoD (no -H,-A,-X)
	-r, --recursive             recurse into directories
	-l, --links                 copy symlinks as symlinks
	-p, --perms                 preserve permissions
	-t, --times                 preserve modification times
	-g, --group                 preserve group
	-o, --owner                 preserve owner (super-user only)
	-D                          same as --devices --specials
		--devices               preserve device files (super-user only)
		--specials              preserve special files

-h, --human-readable        output numbers in a human-readable format
-H, --hard-links            preserve hard links 

--stats                 give some file-transfer stats
--numeric-ids           don't map uid/gid values by user/group name

Otras opciones
-P, --progress              show progress during transfer
  mucho output
-v, --verbose               increase verbosity
  muestra todos los ficheros que se van copiando
-z			compress
--exclude=PATTERN       exclude files matching PATTERN
--exclude-from=FILE     read exclude patterns from FILE
--include=PATTERN       don't exclude files matching PATTERN
--include-from=FILE     read include patterns from FILE
--files-from=FILE       read list of source-file names from FILE
	Dentro de este fichero hay que poner las rutas relativas (mirar ‘man’)


Copiar una estructura de directorios excepto los directorios backup:
rsync -av --progress --exclude backup nagiosql/  nagiosql-sin-backup


Para ver como va el estado en la máquina que recibe el fichero:
ps auxf | grep rsync
cd /proc/<PID RSYNC_HIJO>/
ls -la fd/
  Hay podemos ver el fichero temporal que se está escribiendo
cat io
  También podemos ver en este fichero los bytes transmitidos
watch "cat /proc/27307/io | grep "^write_bytes" | cut -d ' ' -f 2 | awk '{print \$1/1024/1024/1024;}'"
  Ver cuandos GBs llevamos escritos
INIC=$(cat /proc/27307/io | grep "^write_bytes" | cut -d ' ' -f 2 | awk '{print $1/1024/1024/1024;}'); sleep 1m; FIN=$(cat /proc/27307/io | grep "^write_bytes" | cut -d ' ' -f 2 | awk '{print $1/1024/1024/1024;}'); echo "$INIC $FIN" | awk '{print ($2-$1)/60 " GB/s";}'
  calcular velocidad


# Copiar en paralelo
time ls | xargs -P 10 -I {} -n1 rsync -ah /srv/pnp4nagios/var/{} rrdworker:/mnt/pnp4nagios/pnp4nagios/var/
  se lanzan 10 procesos rsync en paralelo, cada uno copiando una carpeta

time parallel -j 50 -i rsync -a {} maquina:pnp4nagios -- `ls -d -1  /srv/pnp4nagios/var/*`
  con el comando parallel


# Copias directorios, contenido
rsync -av datos backup
  copia datos/ dentro de backup. Crea backup si no existe

rsync -av datos/ backup
  copia el contenido de datos/ dentro de backup


# Hard links
-H
  si copiamos varios ficheros que entre ellos estan "hard linking", se mantiene esta relación.

http://earlruby.org/2013/05/creating-differential-backups-with-hard-links-and-rsync/

si copiamos el fichero 'x' al fichero 'y' con rsync, y resulta que 'y' es un hardlink. 'y' se convertira en un nuevo fichero.

Pero si el contenido de 'x' e 'y' es el mismo se mantendrá el hard link.


# Backup
Esta funcionalidad (la de hardlink) es perfecta para cuando queremos hacer backups recursivos.
dia 0:
rsync -av /data /opt/backup0
ln -s /opt/backup0 /opt/last_backup

dia 1:
rsync -av --link-dest=$PWD/last datos/ backup1
ln -snf backup1 last

dia 2:
rsync -av --link-dest=$PWD/last datos/ backup1
ln -snf backup1 last

Lo que estamos haciendo es copiar los nuevos ficheros de datos/ a backup1/. Pero los ficheros que ya existen (en last/) se copian a backup1/ como hard links

Más compacto:
export BAK=$(date +%Y%m%d%H%M%S); rsync -av --link-dest=$PWD/last datos/ $BAK; ln -sfn $BAK last


Cuidado con este método si tenemos mucho muchos ficheros. Tener los inodos también cuesta espacio.

Mirar rbackup, rsnapshot y backuppc. Nos gestionan esto de manera sencilla.

Mirar también si podemos usar un FS que nos de esto: ZFS, btrfs, ...



# compare-dest
rsync -av --compare-dest=DIR ORIGEN/ DESTINO/
  Solo copiamos de ORIGEN a DESTINO los ficheros que NO esten en DIR.
  Es decir, si en DIR teníamos una copia antigua de ORIGEN, acabaremos en DESTINO con una copia de solo los ficheros nuevos.
  Si DIR es un relative-path, es relativo a DESTINO/

# copy-dest
rsync -av --copy-dest=DIR ORIGEN/ DESTINO/
  Copiamos los ficheros de ORIGEN a DESTINO que NO estén en DIR. Luego copiamos localmente los ficheros de DIR a DESTINO 
  Es decir, si en DIR teníamos una copia antigua de ORIGEN. Solo copiamos a DESTINO los ficheros nuevos, y luego con una copia local el resto.
  Si DIR es un relative-path, es relativo a DESTINO/

# link-dest
rsync -av --link-dest=DIR ORIGEN/ DESTINO/
  Copiamos los ficheros de ORIGEN a DESTINO que NO estén en DIR. Luego hacemos hardlink de los ficheros de DIR a DESTINO 
  Es decir, si en DIR teníamos una copia antigua de ORIGEN. Solo copiamos a DESTINO los ficheros nuevos, y luego hardlink para el resto.
  Si DIR es un relative-path, es relativo a DESTINO/
  Los ficheros deben ser IDENTICOS, tiempos de modificación, owner, group, etc.o

Solemos usarlo como
rsync -av --link-dest=$PWD/backup1 datos/ backup2


# Backup muy grandes
Hacer un primer rsync
Luego ir ejecutando rsync seguidos, y cuando estos rsync tarden muy poco, hacer una pequeña parada de la app, hacer otro rsync y reiniciar la app.
De esta manera tendremos un backup consistente.
