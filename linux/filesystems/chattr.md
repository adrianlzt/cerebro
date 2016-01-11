http://lifeofageekadmin.com/how-to-lock-down-files-in-linux-using-chattr/

Bloquear un fichero:
sudo chattr +i resolv.conf
lsattr resolv.conf


# Lock files - concurrencia
https://github.com/karelzak/util-linux/blob/master/sys-utils/flock.c
http://sysadvent.blogspot.com.es/2008/12/day-9-lock-file-practices.html

Flock funciona con llamadas a flock() (man 2 flock), que asignan el lock al fichero. Este lock se pierde si ejecutamos LOCK_UN o todos los file descriptors se cierran. Estos locks se almacenan en memoria del Kernel.
De esta manera evitamos tener que jugar con la creación y borrado de ficheros .lock que podrían tener condiciones de carrera en caso de muerte súbita del proceso y/o máquina.

Se puede usar con NFS con versiones nuevas del kernel (>= 2.6.12)

Usamos el comando flock:

flock /tmp/fichero.lock comando
  Al ejecutar esto, si el fichero /tmp/fichero.lock no existe, se ejecutará el problema.

Si alguien lo ejecuta de nuevo lo mismo (flock /tmp/fichero.lock comando) mientras está el otro corriendo (por lo tanto el fichero de lock creado), flock se pondrá a la espera y una vez desaparezca el fichero .lock ejecutará el comando.

Timeout
Si definimos -w 0, le estamos diciendo que la espera sea 0 segundos, por lo que si existe el fichero de lock, flock saldrá directamente sin ejecutar el comando (con RC=1).

Fallo
Si definimos -n, falla (RC=1) 

Script que solo ejecuta un comando, de larga duración, en caso de que ningún otro lo esté ejecutando. Se encarga de llamar a flock de manera transparente al usuario:

#!/bin/sh

lockfile="/tmp/cron_rsync.lock"
if [ -z "$flock" ] ; then
  lockopts="-w 0 $lockfile"
  exec env flock=1 flock $lockopts $0 "$@"
fi

rsync ...


Cuando se ejecuta el script la variable 'flock' no está definida, por lo que se meterá dentro del if, y reejecutará el script con el programa flock y con la variable flock=1

Si es la primera ejecucción, se ejecutará el script con flock y creará el fichero de lock.
Las siguientes ejecucciónes, mientras el fichero de lock está presente, serán descartadas por el "flock -w 0".

La idea es que se ejecuta en dos vueltas. En la primera se llama a si mismo con flock delante. En la segunda, ya como flock, ejecuta el comando de verdad.

Nota: exec rompe la ejecucción normal para ejecutar el comando. No vuelve al script.
